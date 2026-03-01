const db = require('../../config/db');

async function saveRefreshToken(token, userId) {
  const sql ="UPDATE Users u SET u.Token = ? WHERE u.UserId = ?";

  const [result] = await db.query(sql,[token, userId]);
  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  };
}
async function findToken(token) {
  const sql ="SELECT u.Token from Users u WHERE u.Token = ?";

  const [result] = await db.query(sql,[token]);
  
  return result[0];
}
async function deleteToken(userId) {
  const sql ="UPDATE Users u SET u.Token = null WHERE u.UserId = ?";

  const [result] = await db.query(sql,[userId]);
  return {
    affectedRows: result.affectedRows,
    changedRows: result.changedRows
  };
}


module.exports = { saveRefreshToken,findToken,deleteToken };