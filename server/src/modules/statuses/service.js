const repository = require('./repository');

async function getStatuses() {
  return await repository.queryStatuses();
}

module.exports = {getStatuses}