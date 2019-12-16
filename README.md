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
- Para o presente projeto foi utilizado: Docker, Node.js, MongoDB, Express, Mocha + Chai, JWT, Mongoose, Body-parser, Nodemon and NPM.

### <a name="Rodando">3.Rodando o Projeto</a>
- Para rodar o projeto execute o seguinte comando:
-- docker-compose up --build

### <a name="Testes">4.Efetuando testes</a>  

- Para rodar os testes execute o seguinte comando:
-- npm test

### <a name="Funcionalidades">5.Funcionalidades</a>

- Vejamos algumas funcionalidades da API, os exemplos estão considerando a porta padrão 3000:

#### <a name="Insere">I. Inserindo um planeta:</a>  

- Para inserir um planeta deve ser feita uma requisição post em json para o endpoint "/api/v1/planets".
<br/>
Ex:
http://localhost:3000/api/v1/planets
```JSON
{
   "name": "Nome qualquer",
   "climate": "Clima qualquer",
   "terrain": "Terreno qualquer"
}
```
- Será criado um novo planeta no banco de dados ao qual a ID será gerada automaticamente, não importando se o usuário setar uma id na hora da inserção. Se for inserido um nome, clima ou terreno com caractere vazio ou null na API, ela retornara o erro 400 de requisição inválida.

#### <a name="Lista">II. Listando todos os planetas:</a>

- Para listar todos os planetas basta fazer uma solicitação get para o endpoint "/api/v1/planets".
<br/>
Ex:
http://localhost:3000/api/v1/planets

- Será retornado a id dos planetas, seu nome, seu clima, terreno no formato json.

#### <a name="BuscaId">III. Fazendo busca por ID:</a>

- Para fazer uma busca por id você deverá fazer uma solicitação get para o endpoint "/api/v1/planets/id/:id" junto com a id que você quer pesquisar. 

<br/>
Ex:
http://localhost:3000/api/v1/planets/id/5df80324dcdcda07f8df823d

- Caso seja inserida uma id inválida, será retornado o erro 404. 

#### <a name="BuscaNome">IV. Fazendo busca por NOME:</a>

- Para fazer uma busca por nome você deverá fazer uma solicitação get para o endpoint "/api/v1/planets/name/:name" junto com o nome que você quer pesquisar. 
<br/>
Ex:
http://localhost:3000/api/v1/planets/name/NomeQualquer

#### <a name="Deleta">V. Deletando um planeta:</a>

- Para Deletar um planeta basta fazer uma solicitação delete para o endpoint "/api/v1/planets" indicando a ID do planeta no final do endpoint.
<br/>

Ex: http://localhost:3000/api/v1/planets/5df8054a92648d084673c175

Caso esse planeta não exista ele retornará o erro 404 não encontrado.

### <a name="Final">6. Considerações finais</a>

- Ter o Docker instalado na máquina é obrigatório para rodar o projeto.

- É obrigatório fazer cadastro e autenticação do seu usuário para utilizar os endpoints, se tiver dúvidas, leia os testes de usuário criado.

- É obrigatório passar o token em pelo menos uma das três formas possíveis para utilizar os endpoints.
