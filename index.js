'use strict'; // Força o JS a ser muito mais criterioso.

const app = require('./src/app'); // Chamar a constante do express de app é uma 'convenção'.
const http = require('http');
const debug = require('debug')('nodestr:server'); // Debug para o terminal

const port = normalizePort(process.env.PORT || '3000'); // Chama a função normalizePort e passa a variavel de ambiente do servidor ou 3000.

app.set('port', port); // Fixando a porta do server na porta 3000.
// Obs.: Não é legal fixar a porta, pois não sabemos se estará em uso, no local podemos fazer isso mais em prod por exemplo não é legal.

// Agora com a app instanciada, vamos criar o servidor.
const server = http.createServer(app);

// Agora vamos dizer para o nosso servidor ficar ouvindo nessa porta.
server.listen(port);
server.on('error', onError); // Para verificar se deu erro.
server.on('listening', onListening); // Para ficar escutando.
// Obs.: Existem diversos eventos para o ON dê uma olhada na documentação se tiver alguma dúvida.

console.log('Rodando na porta 3000');

// Vamos criar uma função para normalizar a porta do servidor.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// Função para tratar erro quando levantar o servidor.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  /*
   TODO Podemos pegar na doc do node.js, a lista de erros que podemos tratar,
   eu queria fazer isso mas por causa do prazo não consegui.
  */
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges'); // Erro de permissão do servidor
      
      process.exit(1);

      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use'); // Erro de endereço em uso
      
      process.exit(1);

      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;

  debug('Listening on ' + bind);
}