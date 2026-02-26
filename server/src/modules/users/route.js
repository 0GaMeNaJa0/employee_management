const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.get('/', ctrl.getUsers);

module.exports = router;