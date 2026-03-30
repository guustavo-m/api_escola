const turmasModel = require('../models/turmasModel');

async function listarTodos(req, res) {
  try {
    const turmas = await turmasModel.listarTodos();
    res.status(200).json(turmas);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar turmas', 
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
    
    const turmas = await turmasModel.buscarPorId(id);
    
    if (turmas) {
      res.status(200).json(turmas);
    } else {
      res.status(404).json({ 
        mensagem: `Turma ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar turma',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nomet, cursoid, qtdalu } = req.body;
    
    if (!nomet || !cursoid || !qtdalu) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novoTurmas = await turmasModel.criar({ 
      nomet,
      cursoid,
      qtdalu
    });
    
    res.status(201).json(novoTurmas);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar turma',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nomet, cursoid, qtdalu } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nomet || !cursoid || !qtdalu) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const turmaAtualizado = await turmasModel.atualizar(id, { 
      nomet,
      cursoid,
      qtdalu
    });
    
    if (turmaAtualizado) {
      res.status(200).json(turmaAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Turma ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar turma',
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
    
    const deletado = await turmasModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Turma ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Turma ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar turma',
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
