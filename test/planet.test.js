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

describe('Planet', function() {
  const mock = {
    name: 'Lok',
    climate: 'Árido',
    terrain: 'test',
    app: saltKey
  }

  var id;// Para armazenar o id do usuário mock para que possamos usar durante todo teste.

  it('should list all planets', (done) => {
    request.get({
      url : urlBase + '/planets',
      form: mock
      }, (err, response, body) => {
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
    });
  });
  
  it('should create a test planet', (done) => {
    request.post({
      url : urlBase + '/planets',
      form: mock
      }, (err, response, body) => {
        // precisamos converter o retorno para um objeto json
        let _body = {};
      
        try {
          _body = JSON.parse(body);
        } catch (error) {
          _body = {};
        }
        
        id = _body.data._id;

        expect(response.statusCode).to.equal(201);

        done();
    });
  });

  it('should take a planet by name', (done) => {
    request.get({
      url : urlBase + '/planets/name/' + mock.name,
      form: mock
      }, (err, response, body) => {
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
    });
  });

  it('should take a planet by id', (done) => {
    request.get({
      url : urlBase + '/planets/id/' + id,
      form: mock
      }, (err, response, body) => {
        expect(response.statusCode).to.equal(200);

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
    });
  });

  it('should update a test planet', (done) => {
    request.put({
      url : urlBase + '/planets/'+ id,
      form: mock
      }, (err, response, body) => {
        // precisamos converter o retorno para um objeto json
        let _body = {};
      
        try {
          _body = JSON.parse(body);
        } catch (error) {
          _body = {};
        }
        
        id = _body.data._id;

        expect(response.statusCode).to.equal(200);

        done();
    });
  });

  it('should delete a planet', (done) => {
    request.delete({
        url : urlBase + '/planets/' + id,
        form: mock
      }, (err, response, body) => {
      expect(response.statusCode).to.equal(204);

      done();
    });
  });
});