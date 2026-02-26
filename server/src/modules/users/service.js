const repository = require('./repository');

async function getUsers() {
  return await repository.queryUsers();
}

module.exports = { getUsers };