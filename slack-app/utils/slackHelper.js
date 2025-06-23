// Utility functions for Slack API

/**
 * Helper functions for formatting and sending Slack messages
 */
module.exports = {
  /**
   * Sends a message to a Slack channel
   */
  async sendMessage(client, channel, text, blocks = null) {
    return await client.chat.postMessage({
      channel,
      text,
      blocks: blocks || undefined
    });
  },

  /**
   * Formats a message with consistent styling
   */
  formatMessage(title, content, type = 'info') {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };

    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${icons[type]} *${title}*\n${content}`
          }
        }
      ]
    };
  },

  /**
   * Creates blocks for an interactive message
   */
  createInteractiveMessage(blocks) {
    return {
      blocks: Array.isArray(blocks) ? blocks : [blocks]
    };
  },

  /**
   * Creates a modal view
   */
  createModal(title, blocks, submitText = 'Submit') {
    return {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: title
      },
      blocks: Array.isArray(blocks) ? blocks : [blocks],
      submit: {
        type: 'plain_text',
        text: submitText
      }
    };
  },

  /**
   * Creates a button block
   */
  createButton(text, actionId, value, style = 'primary') {
    return {
      type: 'button',
      text: {
        type: 'plain_text',
        text
      },
      action_id: actionId,
      value,
      style
    };
  },

  /**
   * Creates an actions block with buttons
   */
  createActionsBlock(buttons) {
    return {
      type: 'actions',
      elements: Array.isArray(buttons) ? buttons : [buttons]
    };
  },

  /**
   * Creates a divider block
   */
  dividerBlock() {
    return { type: 'divider' };
  },

  /**
   * Creates a context block with smaller text
   */
  contextBlock(text) {
    return {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text
        }
      ]
    };
  },
  
  /**
   * Updates a message
   */
  async updateMessage(client, channel, ts, text, blocks = null) {
    return await client.chat.update({
      channel,
      ts,
      text,
      blocks: blocks || undefined
    });
  },

  /**
   * Deletes a message
   */
  async deleteMessage(client, channel, ts) {
    return await client.chat.delete({
      channel,
      ts
    });
  }
};