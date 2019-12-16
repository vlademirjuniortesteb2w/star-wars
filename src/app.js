'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// Conecto ao banco.
mongoose.connect(config.connectionString, config.mongoOptions);

// Carrego os Models.
require('./models/planet');
require('./models/user');

app.use(bodyParser.json({
    limit: '5mb'
})); // Transformo o conteúdo para JSON e então eu defino um limite.

app.use(bodyParser.urlencoded({ extended: false })); // Para codificar a url, por exemplo o %20 no espaço.

//Habilito o CORS
app.use(function (req, res, next) {// Por padrão a api nao irá receber requisições de localhost em prod por exemplo
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');/// ATENÇÃO COM X-ACCESS-TOKEN
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});

const indexRoute = require('./routes/index'); // Rota inicial/index
const userRoute = require('./routes/user'); // Rotas de usuários
const planetRoute = require('./routes/planet'); // Rotas de planetas

app.use('/api/v1', indexRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/planets', planetRoute);

module.exports = app;