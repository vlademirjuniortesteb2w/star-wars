'user strict';

const ValidationContract = require('../validators/request');
const repository = require('../repositories/planet');

exports.get = async (req, res, next) => {
  try {
    let data = await repository.get();
    
    return res.status(200).json(data).end();

  } catch (error) {

    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
}

exports.post = async (req, res, next) => {
  let contract = new ValidationContract();

  contract.hasMinLen(req.body.name, 3, 'Nome deve conter pelo menos 3 caracteres.');
  contract.hasMinLen(req.body.climate, 3, 'Clima deve conter pelo menos 3 caracteres.');
  contract.hasMinLen(req.body.terrain, 3, 'Terreno deve conter pelo menos 3 caracteres.');

  if (! contract.isValid()) {
    return res.status(400)
      .json(contract.errors())
      .end();
  }

  try {
    let data = await repository.create(req.body);

    return res.status(201)
      .json({ data })
      .end();
    
  } catch (error) {

    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
};

exports.getByName = async (req, res, next) => {
  try {
    let data = await repository.getByName(req.params.name);

    if (data == null) {
      return res.status(404)
        .end();
    }

    return res.status(200).json({ data }).end();
    
  } catch (error) {
    
    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
}

exports.getById = async (req, res, next) => {
  try {
    let data = await repository.getById(req.params.id);

    if (data == null) {
      return res.status(404)
        .end();
    }

    return res.status(200)
      .json({ data: data })
      .end();

  } catch (error) {

    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
}

exports.put = async (req, res, next) => {
  let id = req.params.id;
  let body = req.body;

  try {
    let data = await repository.put(body, id);
    
    return res.status(200).json({ data: data }).end();

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

    if (data == null) {
      return res.status(404).end();  
    }

    return res.status(204).json({}).end();
    
  } catch (error) {

    return res.status(500).json({
      message: 'Falha ao processar sua requisição'
    }).end();
  }
};