const db = require('../../config/db');

async function queryStatuses() {
  const sql ="SELECT * FROM Statuses";

  const [result] = await db.query(sql);
  return result;
}

module.exports = {queryStatuses};