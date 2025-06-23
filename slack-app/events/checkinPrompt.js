const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Placeholder for Slack check-in prompt event handler
module.exports = async function checkinPrompt({ client, channel, user }) {
  // TODO: Implement sending a check-in prompt to a user
  await client.chat.postMessage({
    channel,
    text: `How are you feeling today? Please submit your daily check-in.`,
    blocks: [
      {
        type: 'section',
        text: { type: 'mrkdwn', text: 'How are you feeling today? Please submit your daily check-in.' },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '😊 Good' },
            value: 'good',
            action_id: 'checkin_good',
          },
          {
            type: 'button',
            text: { type: 'plain_text', text: '😐 Okay' },
            value: 'okay',
            action_id: 'checkin_okay',
          },
          {
            type: 'button',
            text: { type: 'plain_text', text: '😟 Stressed' },
            value: 'stressed',
            action_id: 'checkin_stressed',
          },
        ],
      },
    ],
  });
};

async function handleCheckinPrompt(app) {
  // Schedule daily check-in prompts
  const scheduleCheckins = async () => {
    try {
      const users = await prisma.user.findMany({
        where: { 
          isActive: true,
          slackUserId: { not: null }
        }
      });

      for (const user of users) {
        await sendCheckinPrompt(app.client, user);
      }
    } catch (error) {
      console.error('Error scheduling check-ins:', error);
    }
  };

  // Run at 9 AM every weekday
  setInterval(async () => {
    const now = new Date();
    if (now.getHours() === 9 && now.getMinutes() === 0 && now.getDay() !== 0 && now.getDay() !== 6) {
      await scheduleCheckins();
    }
  }, 60 * 1000); // Check every minute
}

async function sendCheckinPrompt(client, user) {
  try {
    await client.chat.postMessage({
      channel: user.slackUserId,
      text: 'How are you feeling today? Please submit your daily check-in.',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '👋 Good morning! How are you feeling today?'
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: '😊 Great' },
              value: 'great',
              action_id: 'checkin_great'
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: '😐 Okay' },
              value: 'okay',
              action_id: 'checkin_okay'
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: '😟 Stressed' },
              value: 'stressed',
              action_id: 'checkin_stressed'
            }
          ]
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: 'Your response helps us support team well-being 💪'
            }
          ]
        }
      ]
    });

    // Log that the prompt was sent
    await prisma.checkIn.create({
      data: {
        userId: user.id,
        promptSent: true,
        promptSentAt: new Date()
      }
    });
  } catch (error) {
    console.error(`Error sending check-in prompt to user ${user.id}:`, error);
  }
}

// Handle check-in responses
async function handleCheckinResponse(client, userId, response) {
  try {
    // Update the check-in record
    const checkIn = await prisma.checkIn.create({
      data: {
        userId,
        mood: response,
        responseTime: new Date()
      }
    });

    // Send confirmation and wellness tip
    const tips = {
      great: "That's wonderful! Remember to celebrate your wins, no matter how small. 🎉",
      okay: "Thanks for sharing. Remember to take short breaks to recharge when needed. 🌿",
      stressed: "Thank you for being honest. Remember it's okay to ask for support when needed. Consider taking a short walk or deep breathing exercise. 🌱"
    };

    await client.chat.postMessage({
      channel: userId,
      text: `Thanks for checking in! ${tips[response]}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Thanks for checking in! ${tips[response]}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `View your well-being dashboard: ${process.env.FRONTEND_URL}/dashboard`
            }
          ]
        }
      ]
    });

    return checkIn;
  } catch (error) {
    console.error('Error handling check-in response:', error);
    throw error;
  }
}

module.exports = { 
  handleCheckinPrompt,
  handleCheckinResponse
};