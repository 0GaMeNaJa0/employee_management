const db = require('../../config/db');

async function queryUsers() {
  const sqlSelect = "select u.UserId, u.Email,u.`Name`, r.RoleId as 'RoleId',r.Name as 'RoleName',s.StatusId as 'StatusId', s.Name as 'StatusName'";
  const sqlFromWhere = "from Users u "
  + "left join Roles r on u.RoleId = r.RoleId " 
  + "left join Statuses s on u.StatusId = s.StatusId ";

  const sqlText = sqlSelect + sqlFromWhere;
  const [rows] = await db.query(sqlText);
  return rows;
}

async function insertUser(userData) {

  const user = userData instanceof User ? userData : new User(userData);

  if (!user.email || !user.name) {
    throw new Error('Missing required fields: email and name are required.');
  }

  const sql = `INSERT INTO Users (Email, \`Name\`, RoleId, StatusId) VALUES (?, ?, ?, ?)`;

  const params = [user.email, user.name, user.roleId || null, user.statusId || null];

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

module.exports = { queryUsers,insertUser,updateUser,deleteUser };