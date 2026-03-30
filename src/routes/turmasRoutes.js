const express = require('express');
const router = express.Router();

const turmasController = require('../controllers/turmasController');

router.get('/', turmasController.listarTodos);

router.get('/:id', turmasController.buscarPorId);

router.post('/', turmasController.criar);

router.put('/:id', turmasController.atualizar);

router.delete('/:id', turmasController.deletar);

module.exports = router;
