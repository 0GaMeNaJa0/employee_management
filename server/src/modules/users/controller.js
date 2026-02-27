const service = require('./service');

async function getUsers(req, res, next) {
  try {
    const users = await service.getUsers();
    res.json(users);
  } catch (err) { next(err); }
}
async function createUser(req, res, next) {
  try {
    const userData = req.body;
    const result = await service.createUser(userData);

    if (result && result.insertId) {
      return res.status(201).json({ message: "User created", userId: result.insertId });
    }
    // fallback if service returns something unexpected
    return res.status(500).send("Failed to create user");
  } catch (err) {
    next(err);
  }
}
async function editUser(req, res, next) {
  try {
    const userData = req.body;
    userData.userId = req.params.id; // ensure id comes from URL

    const result = await service.editUser(userData);

    if (result && result.affectedRows > 0) {
      return res.status(200).send("User updated");
    }
    return res.status(404).send("User not found or no changes made");
  } catch (err) { next(err); }
}
async function deleteUser(req, res, next) {
  try {
    const userId = req.params.id;
    const result = await service.deleteUser(userId);
    if (result && result.affectedRows > 0) {
      return res.status(200).send("User deleted");
    }
    return res.status(404).send("User not found");
  } catch (err) { next(err); }
}

module.exports = {
  getUsers,
  createUser,
  editUser,
  deleteUser
};