const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample organization
  const organization = await prisma.organization.upsert({
    where: { id: 'org_1' },
    update: {},
    create: {
      id: 'org_1',
      name: 'Acme Corporation',
      domain: 'acme.com',
    },
  });

  // Create organization settings
  await prisma.organizationSettings.upsert({
    where: { organizationId: organization.id },
    update: {},
    create: {
      organizationId: organization.id,
      checkInEnabled: true,
      checkInTime: '09:00',
      checkInDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      anonymizationEnabled: true,
      dataRetentionDays: 365,
      emailNotificationsEnabled: true,
      slackNotificationsEnabled: true,
    },
  });

  // Create sample teams
  const engineeringTeam = await prisma.team.upsert({
    where: { id: 'team_1' },
    update: {},
    create: {
      id: 'team_1',
      name: 'Engineering',
      description: 'Software development team',
      organizationId: organization.id,
    },
  });

  const marketingTeam = await prisma.team.upsert({
    where: { id: 'team_2' },
    update: {},
    create: {
      id: 'team_2',
      name: 'Marketing',
      description: 'Marketing and communications team',
      organizationId: organization.id,
    },
  });

  const salesTeam = await prisma.team.upsert({
    where: { id: 'team_3' },
    update: {},
    create: {
      id: 'team_3',
      name: 'Sales',
      description: 'Sales and business development team',
      organizationId: organization.id,
    },
  });

  // Create managers first (without managerId)
  const sarah = await prisma.user.upsert({
    where: { email: 'sarah.manager@acme.com' },
    update: {},
    create: {
      email: 'sarah.manager@acme.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'MANAGER',
      teamId: engineeringTeam.id,
      slackUserId: 'U1234567890',
      clerkId: 'clerk_sarah',
    },
  });

  const james = await prisma.user.upsert({
    where: { email: 'james.marketing@acme.com' },
    update: {},
    create: {
      email: 'james.marketing@acme.com',
      firstName: 'James',
      lastName: 'Wilson',
      role: 'MANAGER',
      teamId: marketingTeam.id,
      slackUserId: 'U1234567894',
      clerkId: 'clerk_james',
    },
  });

  const lisa = await prisma.user.upsert({
    where: { email: 'lisa.sales@acme.com' },
    update: {},
    create: {
      email: 'lisa.sales@acme.com',
      firstName: 'Lisa',
      lastName: 'Anderson',
      role: 'MANAGER',
      teamId: salesTeam.id,
      slackUserId: 'U1234567896',
      clerkId: 'clerk_lisa',
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@acme.com' },
    update: {},
    create: {
      email: 'admin@acme.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      clerkId: 'clerk_admin',
    },
  });

  // Update team managers
  await Promise.all([
    prisma.team.update({
      where: { id: engineeringTeam.id },
      data: { managerId: sarah.id },
    }),
    prisma.team.update({
      where: { id: marketingTeam.id },
      data: { managerId: james.id },
    }),
    prisma.team.update({
      where: { id: salesTeam.id },
      data: { managerId: lisa.id },
    }),
  ]);

  // Create employees with proper manager references
  const alex = await prisma.user.upsert({
    where: { email: 'alex.dev@acme.com' },
    update: {},
    create: {
      email: 'alex.dev@acme.com',
      firstName: 'Alex',
      lastName: 'Chen',
      role: 'EMPLOYEE',
      teamId: engineeringTeam.id,
      managerId: sarah.id,
      slackUserId: 'U1234567891',
      clerkId: 'clerk_alex',
    },
  });

  const maria = await prisma.user.upsert({
    where: { email: 'maria.dev@acme.com' },
    update: {},
    create: {
      email: 'maria.dev@acme.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      role: 'EMPLOYEE',
      teamId: engineeringTeam.id,
      managerId: sarah.id,
      slackUserId: 'U1234567892',
      clerkId: 'clerk_maria',
    },
  });

  const david = await prisma.user.upsert({
    where: { email: 'david.dev@acme.com' },
    update: {},
    create: {
      email: 'david.dev@acme.com',
      firstName: 'David',
      lastName: 'Kim',
      role: 'EMPLOYEE',
      teamId: engineeringTeam.id,
      managerId: sarah.id,
      slackUserId: 'U1234567893',
      clerkId: 'clerk_david',
    },
  });

  const emma = await prisma.user.upsert({
    where: { email: 'emma.marketing@acme.com' },
    update: {},
    create: {
      email: 'emma.marketing@acme.com',
      firstName: 'Emma',
      lastName: 'Brown',
      role: 'EMPLOYEE',
      teamId: marketingTeam.id,
      managerId: james.id,
      slackUserId: 'U1234567895',
      clerkId: 'clerk_emma',
    },
  });

  // Create sample check-ins for the past 30 days
  const checkInPromises = [];
  const userIds = [alex.id, maria.id, david.id, emma.id];

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    userIds.forEach(userId => {
      // Generate realistic mood scores with some variation
      const baseMood = 7;
      const variation = Math.floor(Math.random() * 4) - 2; // -2 to +2
      const moodScore = Math.max(1, Math.min(10, baseMood + variation));

      checkInPromises.push(
        prisma.checkIn.create({
          data: {
            userId,
            moodScore,
            energyLevel: Math.floor(Math.random() * 10) + 1,
            stressLevel: Math.floor(Math.random() * 10) + 1,
            workloadLevel: Math.floor(Math.random() * 10) + 1,
            reflection: Math.random() > 0.7 ? 'Feeling productive today!' : null,
            submittedAt: date,
            submittedVia: 'slack',
          },
        })
      );
    });
  }

  await Promise.all(checkInPromises);

  // Create sample after-hours activity
  const afterHoursPromises = [];
  const activityTypes = ['slack_message', 'calendar_event', 'login', 'email'];

  for (let i = 0; i < 20; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(20 + Math.floor(Math.random() * 4)); // 8 PM to 12 AM

    userIds.forEach(userId => {
      if (Math.random() > 0.7) { // 30% chance of after-hours activity
        afterHoursPromises.push(
          prisma.afterHoursActivity.create({
            data: {
              userId,
              activityType: activityTypes[Math.floor(Math.random() * activityTypes.length)],
              timestamp: date,
              duration: Math.floor(Math.random() * 60) + 15,
              description: 'After-hours work activity',
              riskLevel: Math.floor(Math.random() * 5) + 3, // 3-7 risk level
            },
          })
        );
      }
    });
  }

  await Promise.all(afterHoursPromises);

  // Create sample recovery scores for the past 4 weeks
  const recoveryPromises = [];
  const weeks = [0, 1, 2, 3];

  weeks.forEach(weekOffset => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (weekOffset * 7));
    // Set to Monday (1 = Monday, 0 = Sunday)
    const dayOfWeek = weekStart.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    weekStart.setDate(weekStart.getDate() - daysToMonday);

    userIds.forEach(userId => {
      recoveryPromises.push(
        prisma.recoveryScore.create({
          data: {
            userId,
            ptoTaken: Math.random() > 0.8,
            weekendWork: Math.random() > 0.6,
            vacationDays: Math.floor(Math.random() * 3),
            sickDays: Math.floor(Math.random() * 2),
            score: Math.floor(Math.random() * 40) + 60, // 60-100 score
            weekOf: weekStart,
          },
        })
      );
    });
  });

  await Promise.all(recoveryPromises);

  // Create sample burnout risk assessments
  const burnoutPromises = [
    prisma.burnoutRisk.create({
      data: {
        teamId: engineeringTeam.id,
        riskScore: 45,
        riskLevel: 'MEDIUM',
        factors: ['high_workload', 'after_hours_activity'],
        aiInsights: 'Team shows moderate stress levels with some after-hours activity. Consider workload distribution.',
        recommendations: ['Schedule team check-ins', 'Review project timelines', 'Encourage breaks'],
        calculatedAt: new Date(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    }),
    prisma.burnoutRisk.create({
      data: {
        teamId: marketingTeam.id,
        riskScore: 25,
        riskLevel: 'LOW',
        factors: ['good_recovery', 'stable_mood'],
        aiInsights: 'Team is performing well with good work-life balance indicators.',
        recommendations: ['Maintain current practices', 'Continue team building activities'],
        calculatedAt: new Date(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.burnoutRisk.create({
      data: {
        teamId: salesTeam.id,
        riskScore: 65,
        riskLevel: 'HIGH',
        factors: ['declining_mood', 'high_stress', 'poor_recovery'],
        aiInsights: 'Team shows concerning trends with declining mood scores and high stress levels.',
        recommendations: ['Immediate workload review', 'Schedule 1:1s', 'Consider team retreat'],
        calculatedAt: new Date(),
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
  ];

  await Promise.all(burnoutPromises);

  // Create sample notifications
  const notificationPromises = [
    prisma.notification.create({
      data: {
        userId: sarah.id,
        title: 'Team Burnout Alert',
        message: 'Engineering team shows moderate burnout risk. Review recent trends.',
        type: 'BURNOUT_ALERT',
        priority: 'HIGH',
        actionUrl: '/dashboard/manager',
        actionText: 'View Details',
      },
    }),
    prisma.notification.create({
      data: {
        userId: james.id,
        title: 'Weekly Summary Available',
        message: 'Your team\'s weekly wellness summary is ready.',
        type: 'WEEKLY_SUMMARY',
        priority: 'MEDIUM',
        actionUrl: '/dashboard/manager',
        actionText: 'View Summary',
      },
    }),
  ];

  await Promise.all(notificationPromises);

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created:
  - 1 Organization
  - 3 Teams
  - 8 Users (3 Managers, 4 Employees, 1 Admin)
  - ${checkInPromises.length} Check-ins
  - ${afterHoursPromises.length} After-hours activities
  - ${recoveryPromises.length} Recovery scores
  - 3 Burnout risk assessments
  - 2 Notifications
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 