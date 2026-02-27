const express = require('express');
const ctrl = require('./controller');
const router = express.Router();

router.get('/', ctrl.getUsers);
router.post('/', ctrl.createUser);
// include id in path for update/delete
router.put('/:id', ctrl.editUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;