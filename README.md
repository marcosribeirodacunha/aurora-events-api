# Aurora Events API

## Instalação

Para clonar e executar esta aplicação é necessário possuir instalado [Git](https://git-scm.com/) e [NodeJS](https://nodejs.org/en/download/) (que instala também o [npm](https://www.npmjs.com/)). Em sua linha de comando:

```bash
# Clone o repositório
$ git clone https://github.com/marcosribeirodacunha/aurora-api.git

# Entre no repositório
$ cd aurora-api

# Instale as dependências
$ npm install
// ou yarn
```

### Banco de dados

Esta aplicação utiliza como banco de dados o [Postgres](https://www.postgresql.org/) em um container do [Docker](https://www.docker.com/). Entretanto é possivel utilizar o banco instalado localmente.

### Migrations

Antes de realizar as migrations realize os seguintes passos:

- Crie um banco de dados com o nome `aurora_events`;
- Verifique se o `username` e `password` utilizados em seu banco banco de dados condizem com aqueles contidos no arquivo `ormconfig.json`. Caso estejam diferentes, no aquivo `ormconfig.json`:
  - Troque o campo `username` para o mesmo utilizado em seu BD;
  - Troque o campo `password` para o mesmo utilizado em seu BD;

Após verificar os passos anteriores execute os seguintes comandos:

```bash
# Executa as migrations
$ npm run typeorm migration:run
// ou yarn typeorm migration:run
```

### Executar a API

```bash
# Para executar a API em ambiente de desenvolvimento
$ npm run dev
// ou yarn dev
```

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
