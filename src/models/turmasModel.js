const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM turmas ORDER BY idt'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM turmas WHERE idt = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nomet, cursoid, qtdalu } = dados;

  const sql = `
    INSERT INTO turmas (nomet, cursoid, qtdalu)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nomet, cursoid, qtdalu]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nomet, cursoid, qtdalu } = dados;
  
  const sql = `
    UPDATE turmas
    SET nomet = $1, cursoid = $2, qtdalu = $3
    WHERE idt = $4
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nomet, cursoid, qtdalu, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM turmas WHERE idt = $1',
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
