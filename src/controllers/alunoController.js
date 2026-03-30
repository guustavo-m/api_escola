const alunoModel = require('../models/alunoModel');

async function listarTodos(req, res) {
  try {
    const aluno = await alunoModel.listarTodos();
    res.status(200).json(aluno);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar aluno', 
      erro: erro.message 
    });
  }
}

async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const aluno = await alunoModel.buscarPorId(id);
    
    if (aluno) {
      res.status(200).json(aluno);
    } else {
      res.status(404).json({ 
        mensagem: `Aluno ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar aluno',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nome, email, tel, turma } = req.body;
    
    if (!nome || !email || !tel || !turma) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novoaluno = await alunoModel.criar({ 
      nome,
      email,
      tel,
      turma
    });
    
    res.status(201).json(novoaluno);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar aluno',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, tel, turma } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nome || !email || !tel || !turma) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const alunoAtualizado = await alunoModel.atualizar(id, { 
      nome,
      email,
      tel,
      turma
    });
    
    if (alunoAtualizado) {
      res.status(200).json(alunoAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Aluno ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar aluno',
      erro: erro.message 
    });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await alunoModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Aluno ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Aluno ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar aluno',
      erro: erro.message 
    });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
