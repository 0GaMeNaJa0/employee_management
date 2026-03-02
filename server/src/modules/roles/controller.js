const service = require('./service');

async function getRoles(req, res, next) {
  try {
    const roles = await service.getRoles();
    res.json(roles);
  } catch (err) { next(err); }
}

module.exports = {getRoles};