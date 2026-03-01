const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);
router.post('/refresh', ctrl.refresh);

module.exports = router;