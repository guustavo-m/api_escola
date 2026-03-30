const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM aluno ORDER BY rm'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM aluno WHERE rm = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nome, email, tel, turma } = dados;

  const sql = `
    INSERT INTO aluno (nome, email, tel, turma)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, email, tel, turma]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, email, tel, turma } = dados;
  
  const sql = `
    UPDATE aluno
    SET nome = $1, email = $2, tel = $3, turma = $4
    WHERE rm = $5
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, email, tel, turma, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM aluno WHERE rm = $1',
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
