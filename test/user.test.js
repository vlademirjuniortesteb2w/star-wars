'use strict';

/**
 * A API utilizada neste teste é:
 * @see http://localhost:3000/api/v1
 * Observe a porta que está rodando, deve ser na 3000!
 * TODO colocar a URL e SALT KEY em uma variável de ambiente para facilitar.
 *
 * @author Vlademir Manoel
 * @see https://github.com/vlademirhub?tab=repositories
 */

/**
 * Carrega as bibliotecas que vamos utilizar.
 * O mocha não é carregado aqui, pois ele que executa este arquivo.
 */
const should = require('should');
const request = require('request');
const chai = require('chai');
const expect = chai.expect;
const urlBase = 'http://localhost:3000/api/v1';
const saltKey = 'O>_j<v0J7?L]4wn-ejbsopGj[eb4b@2-?$o9{s=)B[.!vi5-O1ZRe>5c#%Mp/z$';

describe('User', function() {
  const mock = {
    name: 'Vlademir Santos',
    email: 'vlademirjunior@protonmail.com',
    password: '123456',
    roles: 'test,user',
    app: saltKey
  }

  var token;// Para armazenar o token do usuário mock para que possamos usar durante todo teste.
  var id;// Para armazenar o id do usuário mock para que possamos usar durante todo teste.
  
  it('should create a test user', (done) => {
    request.post({
      url : urlBase + '/users',
      form: mock
      }, (err, response, body) => {
        expect(response.statusCode).to.equal(201);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
    });
  });

  it('should receive JSON Web Token when authenticated with valid credentials', (done) => {
    request.post({
        url : urlBase + '/users/authenticate',
        form: mock
      }, (err, response, body) => {
        // precisamos converter o retorno para um objeto json
        let _body = {};
        
        try {
          _body = JSON.parse(body);
        } catch (error) {
          _body = {};
        }

        if (_body.should.have.property('token')) {
          token = _body.token;
          id = _body.data.id;

          expect(response.statusCode).to.equal(200);
        }
        
        done();
    });
  });

  it('should receive a new JSON Web Token when send valid token', (done) => {
    request.post({
      url : urlBase + '/users/refresh-token',
      form: { token: token }
      }, (err, response, body) => {
        let _body = {};
        
        try {
          _body = JSON.parse(body);
        } catch (error) {
          _body = {};
        }

        if (_body.should.have.property('token')) {
          expect(response.statusCode).to.equal(200);
        }
        
        done();
    });
  });

  it('should delete a user', (done) => {
    request.delete({ 
        url : urlBase + '/users/' + id,
        form: { token: token }
      }, (err, response, body) => {
        expect(response.statusCode).to.equal(204);

        done();
    });
  });
});