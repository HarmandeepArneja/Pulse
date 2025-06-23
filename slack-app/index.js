const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Import event handlers
const { handleBurnoutNudges } = require('./events/burnoutNudges');
const { handleCheckinPrompt } = require('./events/checkinPrompt');
const { formatMessage } = require('./utils/slackHelper');

// Event handlers
app.event('app_mention', async ({ event, say }) => {
  try {
    await say(`👋 Hi <@${event.user}>! Pulse Slack app is running.`);
  } catch (error) {
    console.error('Error handling app mention:', error);
  }
});

// Slash command handler
app.command('/pulse', async ({ command, ack, say }) => {
  try {
    await ack();
    const helpText = `
*Pulse Commands*
• \`/pulse checkin\` - Start a mood check-in
• \`/pulse report\` - View your well-being report
• \`/pulse help\` - Show this help message
    `;
    await say(formatMessage('Help', helpText));
  } catch (error) {
    console.error('Error handling pulse command:', error);
    await say('Sorry, something went wrong! Please try again later.');
  }
});

// Start the app
(async () => {
  try {
    const port = process.env.PORT || 3002;
    await app.start(port);
    console.log(`⚡️ Pulse Slack app is running on port ${port}`);
    
    // Initialize scheduled tasks
    handleBurnoutNudges(app);
    handleCheckinPrompt(app);
  } catch (error) {
    console.error('Error starting Slack app:', error);
    process.exit(1);
  }
})();
