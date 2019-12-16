'use strict';

const express = require('express');
const router = express.Router(); // Arquivo de rotas para o usuário chegar até nossa aplicação.

// Rota raiz
const route = router.get('/', (req, res, next) => {
  // OK
  res.status(200).json({
    title: 'Test API REST',
    version: '0.0.1',
    method: 'GET',
    description: 'Running with nodemon'
  });
});

module.exports = router;