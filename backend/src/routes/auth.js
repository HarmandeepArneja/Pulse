const express = require('express');
const router = express.Router();

// TODO: Add Clerk/Firebase/Auth0 integration
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint (to be implemented)' });
});

router.post('/signup', (req, res) => {
  res.json({ message: 'Signup endpoint (to be implemented)' });
});

module.exports = router; 