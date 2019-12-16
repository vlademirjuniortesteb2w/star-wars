'use strict';

const express = require('express');
const router = express.Router(); // Arquivo de rotas para o usuário chegar até nossa aplicação.
const controller = require('../controllers/user'); // Referenciando o meu controller.
const authService = require('../services/auth');

// Rotas
router.post('/', controller.post);

router.post('/authenticate', controller.authenticate);

router.post('/refresh-token', authService.authorize, controller.refreshToken);

router.delete('/:id', authService.authorize, controller.delete);

module.exports = router; // Exportando as rotas