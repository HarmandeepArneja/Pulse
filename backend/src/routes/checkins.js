const express = require('express');
const router = express.Router();

// TODO: Add endpoints for submitting and fetching check-ins
router.get('/', (req, res) => {
  res.json({ message: 'Get check-ins (to be implemented)' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Submit check-in (to be implemented)' });
});

module.exports = router; 