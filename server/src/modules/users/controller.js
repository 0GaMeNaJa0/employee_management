const service = require('./service');

async function getUsers(req, res, next) {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (err) { next(err); }
}

module.exports = {
  getUsers,
};