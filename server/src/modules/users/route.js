const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.get('/', ctrl.getUsers);
router.get('/:userId', ctrl.getUser);
router.post('/', ctrl.createUser);
router.put('/', ctrl.editUser);
router.delete('/', ctrl.deleteUser);

module.exports = router;