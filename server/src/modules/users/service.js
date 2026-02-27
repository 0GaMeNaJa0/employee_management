const repository = require('./repository');

async function getUsers() {
  return await repository.queryUsers();
}
async function createUser(data) {
  return await repository.insertUser(data);
}
async function editUser(data) {
  return await repository.updateUser(data);
}
async function deleteUser(userId) {
  return await repository.deleteUser(userId);
}

module.exports = { getUsers,createUser,editUser,deleteUser };