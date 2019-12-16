'use strict';

const mongoose = require('mongoose');
const users = mongoose.model('users');

exports.create = async (data) => {
    let user = new users(data);

    const res = await user.save();

    return res;
}

exports.authenticate = async (data) => {
    let user = await users.findOne({
        email: data.email,
        password: data.password // Já vem encriptada.
    });

    return user;
}

exports.getById = async (id) => {
    let user = await users.findById(id);

    return user;
}

exports.destroy = async (id) => {
    const res = await users.findOneAndRemove(id);

    return res;
}