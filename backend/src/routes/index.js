const express = require('express');
const auth = require('./auth');
const checkins = require('./checkins');
const analytics = require('./analytics');
const integrations = require('./integrations');
const email = require('./email');

const router = express.Router();

router.use('/auth', auth);
router.use('/checkins', checkins);
router.use('/analytics', analytics);
router.use('/integrations', integrations);
router.use('/email', email);

module.exports = router; 