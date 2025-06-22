const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.event('app_mention', async ({ event, say }) => {
  await say(`👋 Hi <@${event.user}>! Pulse Slack app is running.`);
});

app.command('/pulse', async ({ command, ack, say }) => {
  await ack();
  await say('Pulse command received! (to be implemented)');
});

(async () => {
  await app.start(process.env.PORT || 3002);
 