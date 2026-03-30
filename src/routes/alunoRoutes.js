const express = require('express');
const router = express.Router();

const alunoController = require('../controllers/alunoController');

router.get('/', alunoController.listarTodos);

router.get('/:id', alunoController.buscarPorId);

router.post('/', alunoController.criar);

router.put('/:id', alunoController.atualizar);

router.delete('/:id', alunoController.deletar);

module.exports = router;
