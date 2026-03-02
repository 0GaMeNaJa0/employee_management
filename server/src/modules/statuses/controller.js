const service = require('./service');

async function getStatuses(req, res, next) {
  try {
    const roles = await service.getStatuses();
    res.json(roles);
  } catch (err) { next(err); }
}

module.exports = {getStatuses};