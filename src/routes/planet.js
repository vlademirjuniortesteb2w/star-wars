'use strict';

const express = require('express');
const router = express.Router(); // Arquivo de rotas para o usuário chegar até nossa aplicação.
const controller = require('../controllers/planet'); // Referenciando o meu controller
const authService = require('../services/auth');

// Rotas
router.get('/', authService.authorize, controller.get);

router.post('/', authService.authorize, controller.post);

router.get('/name/:name', authService.authorize, controller.getByName);

router.get('/id/:id', authService.authorize, controller.getById);

router.put('/:id', authService.authorize, controller.put);

router.delete('/:id', authService.authorize, controller.delete);

module.exports = router; // Exportando as rotas
