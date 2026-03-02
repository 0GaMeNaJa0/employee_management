const repository = require('./repository');

async function getRoles() {
  return await repository.queryRoles();
}

module.exports = {getRoles}