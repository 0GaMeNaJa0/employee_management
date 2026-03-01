const db = require('../../config/db');
const User = require('./model');
const bcrypt = require('bcrypt');

async function queryUsers() {
  const sql =
    "SELECT u.UserId, u.Email, u.`Name`, r.RoleId AS RoleId, r.Name AS RoleName, " +
    "s.StatusId AS StatusId, s.Name AS StatusName " +
    "FROM Users u " +
    "LEFT JOIN Roles r ON u.RoleId = r.RoleId " +
    "LEFT JOIN Statuses s ON u.StatusId = s.StatusId";

  const [rows] = await db.query(sql);
  return rows;
}

async function queryUser(userId) {
  const sql =
    "SELECT u.UserId, u.Email, u.`Name`, r.RoleId AS RoleId, r.Name AS RoleName, " +
    "s.StatusId AS StatusId, s.Name AS StatusName " +
    "FROM Users u " +
    "LEFT JOIN Roles r ON u.RoleId = r.RoleId " +
    "LEFT JOIN Statuses s ON u.StatusId = s.StatusId " +  
    "WHERE u.UserId = ?";

  const [rows] = await db.query(sql,[userId]);
  return rows[0];
}
async function queryUserByEmail(email) {
  const sql =
    "SELECT u.UserId, u.Password, u.Email, u.`Name`, r.RoleId AS RoleId, r.Name AS RoleName, " +
    "s.StatusId AS StatusId, s.Name AS StatusName " +
    "FROM Users u " +
    "LEFT JOIN Roles r ON u.RoleId = r.RoleId " +
    "LEFT JOIN Statuses s ON u.StatusId = s.StatusId " +  
    "WHERE u.Email = ?";

  const [rows] = await db.query(sql,[email]);
  return rows[0];
}

async function insertUser(userData) {
  const SALT_ROUNDS = 12;
  const user = userData instanceof User ? userData : new User(userData);

  if (!user.email || !user.name) {
    throw new Error('Missing required fields: email and name are required.');
  }

  const sql = `INSERT INTO Users (Email, \`Name\`, RoleId, StatusId, Password) VALUES (?, ?, ?, ?,?)`;

  const hashPassword = await bcrypt.hash(user.password, SALT_ROUNDS );
  const params = [user.email, user.name, user.roleId || null, user.statusId || null, hashPassword];

  const [result] = await db.query(sql, params);

  return {
    insertId: result.insertId,
    affectedRows: result.affectedRows
  };
}

async function updateUser(userData) {
  const user = userData instanceof User ? userData : new User(userData);

  if (!user.email || !user.name) {
    throw new Error('Missing required fields: email and name are required.');
  }

  const sql = `
    UPDATE Users
    SET Email = ?, \`Name\` = ?, RoleId = ?, StatusId = ?
    WHERE UserId = ?
  `;

  const params = [
    user.email,
    user.name,
    user.roleId ?? null,
    user.statusId ?? null,
    user.userId
  ];

  const [result] = await db.query(sql, params);

  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  };
}

async function deleteUser(userId) {

  const sql = `DELETE FROM Users WHERE UserId = ?`;

  const [result] = await db.query(sql, [userId]);

  return {
    affectedRows: result.affectedRows
  };
}

module.exports = { queryUsers,insertUser,updateUser,deleteUser,queryUser,queryUserByEmail };