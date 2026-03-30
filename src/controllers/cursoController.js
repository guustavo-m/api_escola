const cursoModel = require('../models/cursoModel');

async function listarTodos(req, res) {
  try {
    const curso = await cursoModel.listarTodos();
    res.status(200).json(curso);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar curso', 
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
    
    const curso = await cursoModel.buscarPorId(id);
    
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ 
        mensagem: `Curso ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar curso',
      erro: erro.message 
    });
  }
}

async function criar(req, res) {
  try {
    const { nomec, dtaber } = req.body;
    
    if (!nomec || !dtaber) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const novocurso = await cursoModel.criar({ 
      nomec,
      dtaber
    });
    
    res.status(201).json(novocurso);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar curso',
      erro: erro.message 
    });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nomec, dtaber } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!nomec || !dtaber) {
      return res.status(400).json({ 
        mensagem: 'Todos os campos são obrigatórios' 
      });
    }
    
    const cursoAtualizado = await cursoModel.atualizar(id, { 
      nomec,
      dtaber
    });
    
    if (cursoAtualizado) {
      res.status(200).json(cursoAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Curso ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar curso',
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
    
    const deletado = await cursoModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Curso ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Curso ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar curso',
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
