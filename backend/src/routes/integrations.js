const express = require('express');
const router = express.Router();

// TODO: Add endpoints for Slack, Calendar, HR integrations
router.get('/slack', (req, res) => {
  res.json({ message: 'Slack integration status (to be implemented)' });
});

router.get('/calendar', (req, res) => {
  res.json({ message: 'Calendar integration status (to be implemented)' });
});

module.exports = router; 