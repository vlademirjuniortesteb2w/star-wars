'use strict';

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
    // Esse método GERA/ASSINA o token
}

exports.decodeToken = async (token) => {
    return await jwt.verify(token, global.SALT_KEY);
}

exports.authorize = function (req, res, next) {// Middleware de autorização
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    /* Formas possíveis de enviar seu token em uma requisição:
     localhost:3000/api/v1/planets?token=MEUTOKEN
     Em headers no postman: key = x-access-token value=MEUTOKEN
     Corpo da requisição : { "token": "MEUTOKEN", "name": "planetaX",...}
    */
    
    if (req.body.app == global.SALT_KEY) {
        // Se for requisição da própria aplicação é por que estou acessando com super privilégio então libera tudo!
       return next();
    }

    if (! token) {
        return res.status(401).json({
            message: 'Acesso Restrito'
        }).end();
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                return res.status(401).json({
                    message: 'Token inválido'
                }).end();
            } else {
                return next();
            }
        });
    }
}