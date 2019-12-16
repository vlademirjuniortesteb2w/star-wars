'user strict';

const ValidationContract = require('../validators/request');
const repository = require('../repositories/user');
const md5 = require('md5');
const authService = require('../services/auth');
const mongoose = require('mongoose');
const users = mongoose.model('users');


exports.post = async (req, res, next) => {
  users.findOne({ email: req.body.email }, function(err, obj) {
    if (obj) {
      return res.status(422)
        .json({message: 'E-mail em uso!'})
        .end();
    }
  });

  let contract = new ValidationContract();

  contract.hasMinLen(req.body.name, 3, 'Nome deve conter pelo menos 3 caracteres.');
  contract.isEmail(req.body.email, 'Email inválido.');
  contract.validRoles(req.body.roles, 'Papéis inválidos.');
  contract.hasMinLen(req.body.password, 6, 'Senha deve conter pelo menos 6 caracteres.');

  if (! contract.isValid()) {
    return res.status(422).json(contract.errors()).end();
  }

  try {
    await repository.create({
      roles: req.body.roles.split(','),
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    let data = {
      'message': 'Usuário cadastrado, faça autenticação na API para obter seu token de acesso.'
    };

    return res.status(201)
      .json({ data: data })
      .end();

  } catch (error) {

    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    });

    if (! user) {
      return res.status(422)
        .json({ message: 'Usuário ou senha inválidos' })
        .end();
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles
    });

    return res.status(200).json({
      data: { id: user._id, email: user.email, name: user.name },
      token: token
    }).end();

  } catch (error) {

    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    // Recuperar o token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    //Decodifica o token
    const data = await authService.decodeToken(token);

    const user = await repository.getById(data.id);

    if (! user) {
      return res.status(404)
        .json({ message: 'Usuário não encontrado' })
        .end();
    }

    const tokenData = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      roles: user.roles
    });

    return res.status(200).json({
      data: { email: user.email, name: user.name },
      token: tokenData
    }).end();

  } catch (error) {
    
    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;

  try {
    let data = await repository.destroy(id);

    return res.status(204).json({}).end();
    
  } catch (error) {

    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
};