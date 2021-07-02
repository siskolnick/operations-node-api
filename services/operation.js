const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, type_id as typeId,operator1, operator2,CASE WHEN type_id = 1 THEN (operator1 + operator2) WHEN type_id = 2 THEN (operator1 * 2) ELSE (operator1 * operator1) END result FROM operation_result LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(operationData){
  const result = await db.query(
    `INSERT INTO operation_result 
    (operator1, operator2, type_id) 
    VALUES 
    (?, ?, ?)`, 
    [
      operationData.operator1, operationData.operator2, operationData.type_id
    ]
  );

  let message = 'Error in creating operation';

  if (result.affectedRows) {
    message = 'Operation created!';
  }

  return {'message': message, 'id': result.insertId};
}

module.exports = {
  getMultiple,
  create
}
