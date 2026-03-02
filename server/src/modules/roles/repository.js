const db = require('../../config/db');

async function queryRoles() {
  const sql ="SELECT * FROM Roles";

  const [result] = await db.query(sql);
  return result;
}

module.exports = {queryRoles};