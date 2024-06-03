# Projeto de Autenticação JWT Node.js
Um projeto de exemplo que demonstra como implementar autenticação JWT (JSON Web Tokens) em um aplicativo Node.js usando Express, Sequelize e Bcrypt.
## Pré-requisitos
- Ter o Node.js e o npm (Node Package Manager) instalados em sua máquina.
[Node.js](https://nodejs.org/en)

## Setup do projeto
### Instalar
```bash
$ npm install
```

### Abrir o projeto
```bash
$ npm start
```

### Como utilizar
- Registro de Usuário: Faça uma requisição POST para /auth/register com o seguinte corpo:
```bash
{
  "name": "Seu Nome",
  "email": "seu-email@example.com",
  "password": "sua-senha"
}
```

- Login de Usuário: Faça uma requisição POST para /auth/login com o seguinte corpo:
```bash
{
  "email": "seu-email@example.com",
  "password": "sua-senha"
}
```

- Rota Protegida: Para acessar uma rota protegida, faça uma requisição GET para /auth/protected com o token JWT incluído no cabeçalho Authorization, conforme o exemplo a seguir:
```bash
{
  "Authorization": "Bearer <seu-token-jwt>"
}
```

### Testes
- É necessário a extensão [Thunder Client](https://www.thunderclient.com/) ou utilizar o aplicativo [Postman](https://www.postman.com/) para fazer as requisições http.


## Recursos
- [Documentação do Express](https://expressjs.com/)
- [Documentação do Sequelize](https://sequelize.org/)
- [Documentação do JWT](https://jwt.io/)
- [Documentação do Nodemon](https://www.npmjs.com/package/nodemon)

## Licença
Este projeto está licenciado sob a Licença MIT.
