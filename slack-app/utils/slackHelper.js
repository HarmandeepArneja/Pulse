// Utility functions for Slack API
module.exports = {
  async sendMessage(client, channel, text) {
    await client.chat.postMessage({ channel, text });
  },
}; 