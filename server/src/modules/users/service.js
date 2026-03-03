const repository = require('./repository');

async function getUsers(page) {
  return await repository.queryUsers(page);
}

async function getUser(userId) {
  return await repository.queryUser(userId);
}
async function getUserByEmail(email) {
  return await repository.queryUserByEmail(email);
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

module.exports = { getUsers,createUser,editUser,deleteUser,getUser,getUserByEmail };