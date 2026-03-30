const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM curso ORDER BY idc'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM curso WHERE idc = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nomec, dtaber } = dados;

  const sql = `
    INSERT INTO curso (nomec, dtaber)
    VALUES ($1, $2)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nomec, dtaber]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nomec, dtaber } = dados;
  
  const sql = `
    UPDATE curso
    SET nomec = $1, dtaber = $2
    WHERE idc = $3
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nomec, dtaber, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM curso WHERE idc = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
