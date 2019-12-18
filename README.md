# Teste B2W

<div align="center">
  <img src="star-wars.jpg"/> 
</div>

# DESAFIO API STAR WARS B2W - VLADEMIR MANOEL DOS SANTOS JUNIOR

## Índice

 <ol>
  <li><a href="#Sobre">Sobre o projeto</a></li>
  <li><a href="#Tecnologias">Tecnologias utilizadas</a></li>
  <li><a href="#Rodando">Rodando o Projeto</a></li>
  <li><a href="#Testes">Efetuando testes</a></li>
  <li><a href="#Funcionalidades">Funcionalidades</a>
    <ol>
      <li><a href="#InsereUsuario">Inserindo um usuário</a></li>
      <li><a href="#GerandoToken">Gerando um Token de autorização</a></li>
      <li><a href="#RefreshToken">Fazendo Refresh do Token</a></li>
      <li><a href="#DeletaUsuario">Deletando um usuário</a></li>
      <li><a href="#Insere">Inserindo um planeta</a></li>
      <li><a href="#Lista">Listando todos os planetas</a></li>
      <li><a href="#BuscaId">Fazendo busca por ID</a></li>
      <li><a href="#BuscaNome">Fazendo busca por NOME</a></li>
      <li><a href="#Deleta">Deletando um planeta</a></li>
    </ol>
  </li>
  <li><a href="#Final">Considerações finais</a>
 
</ol> 

<dl>
  
### <a name="Sobre">1. Sobre o projeto</a> 

- O objetivo deste projeto é criar uma API rest que armazenará dados como nome de um planeta, clima e terreno.

### <a name="Tecnologias">2.Tecnologias utilizadas</a> 
- Para o presente projeto foi utilizado: Docker, Node.js v12.7.0 , MongoDB, Express, Mocha + Chai, JWT, Mongoose, Body-parser, Nodemon e NPM v6.13.2.

### <a name="Rodando">3.Rodando o Projeto</a>
<br/>
- Para rodar o projeto execute os seguintes comandos:
<br/>
-- npm install
<br/>
-- docker-compose up --build
<br/>
- Obs.: veja se versão do node e npm é compatível com a utilizada no projeto.
<br/>

### <a name="Testes">4.Efetuando testes</a>  

- Para rodar os testes execute o seguinte comando:
<br/>
-- npm test

### <a name="Funcionalidades">5.Funcionalidades</a>

- Vejamos algumas funcionalidades da API, os exemplos estão considerando a porta padrão 3000:

#### <a name="InsereUsuario">I. Inserindo um usuário:</a>  

- Para inserir um usuário deve ser feita uma requisição post para o endpoint "/api/v1/users".
<br/>
Ex:
http://localhost:3000/api/v1/users
<br/>
```JSON
{
   "name": "Nome qualquer", // Pelo menos 3 caracteres
   "email": "email@qualquer.com", // E-mail válido
   "roles": "test,user",//Opções: test,user,admin
   "password": "123456"// Pelo menos 6 caracteres
}
```
- Será criado um novo usuário no banco de dados ao qual a ID será gerada automaticamente, não importando se o usuário setar uma id na hora da inserção. Se for inserido um nome, email, papel ou senha que segue a regra de validação na API, ela retornara o erro 422.

#### <a name="GerandoToken">II. Gerando um Token de autorização:</a>  

- Para gerar um token de autorização deve ser feita uma requisição post em json para o endpoint "/api/v1/users/authenticate".
<br/>
Ex:
http://localhost:3000/api/v1/users/authenticate
<br/>
```JSON
{
   "email": "email@qualquer.com", // E-mail válido e cadastrado na base de dados
   "password": "123456"// Pelo menos 6 caracteres e equivalente ao email inserindo
}
```
- Será retornado um JSON com os dados do usuário e um token.
<br/>
- Copie/Guarde esse token para user em requisições futuras nos endpoints da aplicação.
<br/>
- Algumas formas de uso do token para conseguir consumir nossa API:
<br/>
- Query String: "/planets?token=MEUTOKEN"
<br/>
- No header da requisição: x-access-token MEUTOKEN
<br/>
- No corpo da requisição: { "token": "MEUTOKEN", "name": "planetaX",...}


#### <a name="RefreshToken">III. Fazendo refresh do token:</a>  

- Para atualizar seu token deve ser feita uma requisição post para o endpoint "/api/v1/users/refresh-token" usando uma das formas disponiveis.
<br/>
Ex:
http://localhost:3000/api/v1/users/refresh-token
<br/>
- Algumas formas de enviar o token para conseguir gerar um novo token:
<br/>
- Query String: "/refresh-token?token=MEUTOKEN"
<br/>
- No header da requisição: x-access-token MEUTOKEN
<br/>
- No corpo da requisição: { "token": "MEUTOKEN" }

#### <a name="DeletaUsuario">III. Deletando um usuário:</a>  

- Para Deletar um usuário basta fazer uma solicitação delete para o endpoint "/api/v1/users/:id" indicando a ID do usuário no final do endpoint.
<br/>
Ex:
http://localhost:3000/api/v1/users/5df8054a92648d084673c175
<br/>
- Caso esse usuário não exista ele retornará o erro 404 não encontrado.

#### <a name="Insere">IV. Inserindo um planeta:</a>  

- Para inserir um planeta deve ser feita uma requisição post para o endpoint "/api/v1/planets".
<br/>
Ex:
http://localhost:3000/api/v1/planets
<br/>
```JSON
{
   "name": "Nome qualquer",
   "climate": "Clima qualquer",
   "terrain": "Terreno qualquer"
}
```
- Será retornado um JSON com os dados do usuário e um token.

#### <a name="Lista">V. Listando todos os planetas:</a>

- Para listar todos os planetas basta fazer uma solicitação get para o endpoint "/api/v1/planets".
<br/>
Ex:
http://localhost:3000/api/v1/planets

- Será retornado a id dos planetas, seu nome, seu clima, terreno no formato json.

#### <a name="BuscaId">VI. Fazendo busca por ID:</a>

- Para fazer uma busca por id você deverá fazer uma solicitação get para o endpoint "/api/v1/planets/id/:id" junto com a id que você quer pesquisar. 

<br/>
Ex:
http://localhost:3000/api/v1/planets/id/5df80324dcdcda07f8df823d

- Caso seja inserida uma id inválida, será retornado o erro 404. 

#### <a name="BuscaNome">VII. Fazendo busca por NOME:</a>

- Para fazer uma busca por nome você deverá fazer uma solicitação get para o endpoint "/api/v1/planets/name/:name" junto com o nome que você quer pesquisar. 
<br/>
Ex:
http://localhost:3000/api/v1/planets/name/NomeQualquer

#### <a name="Deleta">VIII. Deletando um planeta:</a>

- Para Deletar um planeta basta fazer uma solicitação delete para o endpoint "/api/v1/planets" indicando a ID do planeta no final do endpoint.
<br/>

Ex: http://localhost:3000/api/v1/planets/5df8054a92648d084673c175

Caso esse planeta não exista ele retornará o erro 404 não encontrado.

### <a name="Final">6. Considerações finais</a>

- Ter o Docker instalado na máquina é obrigatório para rodar o projeto.

- É obrigatório fazer cadastro e autenticação do seu usuário para utilizar os endpoints, se tiver dúvidas, leia os testes de usuário criado.

- É obrigatório passar o token em pelo menos uma das três formas possíveis para utilizar os endpoints.

- Se quiser acessar o MongoDB pela interface web, basta acessar: http://localhost:1234 com os seguintes valores:
  -- Nome da conexão: application
  -- String da conexão: mongodb://db:27017
  -- Clique em conectar na conexão criada.
