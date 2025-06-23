const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function calculateBurnoutRisk(userId) {
  try {
    // Get last 14 days of check-ins and after-hours activity
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    
    const [checkIns, afterHoursActivity] = await Promise.all([
      prisma.checkIn.findMany({
        where: {
          userId,
          createdAt: { gte: twoWeeksAgo }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.afterHoursActivity.findMany({
        where: {
          userId,
          createdAt: { gte: twoWeeksAgo }
        }
      })
    ]);

    // Calculate risk factors
    const lowMoodCount = checkIns.filter(c => c.mood === 'stressed').length;
    const consecutiveLowMood = checkIns.slice(0, 3).every(c => c.mood === 'stressed');
    const highAfterHoursCount = afterHoursActivity.length > 10;

    // Determine risk level
    let riskLevel = 'LOW';
    if (consecutiveLowMood || (lowMoodCount >= 7 && highAfterHoursCount)) {
      riskLevel = 'HIGH';
    } else if (lowMoodCount >= 5 || highAfterHoursCount) {
      riskLevel = 'MEDIUM';
    }

    return riskLevel;
  } catch (error) {
    console.error('Error calculating burnout risk:', error);
    return 'UNKNOWN';
  }
}

async function sendBurnoutAlert({ client, channel, user, riskLevel, manager }) {
  const messages = {
    HIGH: `🚨 *High Burnout Risk Alert*\nOne of your team members is showing signs of high burnout risk. This is based on recent mood patterns and work activity.\n\n*Recommended Actions:*\n• Schedule a casual 1:1 check-in\n• Review their workload\n• Consider suggesting a mental health day`,
    MEDIUM: `⚠️ *Burnout Risk Warning*\nPotential burnout risk detected for a team member. Consider checking in on their workload and well-being.`,
    LOW: null // Don't send notifications for low risk
  };

  const message = messages[riskLevel];
  if (!message) return;

  try {
    await client.chat.postMessage({
      channel: manager.slackUserId,
      text: message,
      blocks: [
        {
          type: 'section',
          text: { type: 'mrkdwn', text: message }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `View full details in the <${process.env.FRONTEND_URL}/manager|Manager Dashboard>`
            }
          ]
        }
      ]
    });

    // Log the alert
    await prisma.burnoutRisk.create({
      data: {
        userId: user.id,
        riskLevel,
        notifiedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Error sending burnout alert:', error);
  }
}

async function handleBurnoutNudges(app) {
  // Check burnout risks every 4 hours
  setInterval(async () => {
    try {
      // Get all active users
      const users = await prisma.user.findMany({
        where: { isActive: true },
        include: { manager: true }
      });

      // Check each user's burnout risk
      for (const user of users) {
        const riskLevel = await calculateBurnoutRisk(user.id);
        
        if (riskLevel !== 'LOW' && user.manager) {
          await sendBurnoutAlert({
            client: app.client,
            channel: user.slackTeamId,
            user,
            riskLevel,
            manager: user.manager
          });
        }
      }
    } catch (error) {
      console.error('Error in burnout nudges:', error);
    }
  }, 4 * 60 * 60 * 1000); // 4 hours
}

module.exports = { handleBurnoutNudges };