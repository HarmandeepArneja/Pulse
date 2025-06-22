const express = require('express');
const router = express.Router();

// TODO: Add endpoints for sending and managing email digests
router.post('/send-summary', (req, res) => {
  res.json({ message: 'Send summary email (to be implemented)' });
});

module.exports = router; 