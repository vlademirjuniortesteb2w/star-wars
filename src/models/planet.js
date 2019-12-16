'use strict';

//Inicia a criação do esquema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    //_id
    name: {
        type: String,
        required: true,
        trim: true // Remove espaços antes e depois da string
    },
    climate: {
        type: String,
        required: true,
        trim: true
    },
    terrain: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('planets', schema);