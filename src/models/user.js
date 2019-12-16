'use strict';

//Inicia a criação do esquema
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);// Por causa do unique

const Schema = mongoose.Schema;

const schema = new Schema({
    //_id
    name: {
        type: String,
        required: true,
        trim: true // Remove espaços antes e depois da string
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: [{// Array de strings, nesse caso apenas 3
        type: String,
        require: true,
        enum: ['test', 'user', 'admin'],
        default: 'user'
    }],
    /*
     TODO queria colocar algo que apenas admin tivesse permissão
     mas o não consegui por causa do prazo e escopo mas já deixo aqui a base da ideia.
    */
});

module.exports = mongoose.model('users', schema);