# Codigo exemplo Node Sequelize Postgres Docker

## Este projeto foi criado utilizando:
- [Node 16](https://nodejs.org/dist/latest-v16.x/docs/api/)
- [Sequelize 6](https://sequelize.org/docs/v6/)
- [PostgreSql](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Startar a api localmente:
### `npm i`
para criar baixar as dependencias

### `docker-compose up`
para criar os containers, a partir desse comando a aplicação já vai estar disponível localmente

### `npx sequelize-cli db:migrate`
para criar as tabelas no banco postgres que vai estar rodando em um container

### `npx sequelize-cli db:seed:all`
para popular as tabelas

### `docker-compose down`
para criar os derrubar os container e parar a api

## Rodar os testes:

### `npm test`

## Infos:

na pasta utils se encontram 3 arquivos .json

### `jsonexample-categoria`
exemplo de arquivo para fazer o upload de categorias

### `jsonexample-produto`
exemplo de arquivo para fazer o upload de produtos

### `prova growth.postman_collection`
pasta de endpoints do postman

