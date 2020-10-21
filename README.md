<h1 align="center">
  <br />
  <img alt="Aurora Events" src="./github/logo.svg" width="200px" />
</h1>

<h1 align="center">Aurora Events API</h1>

<h4 align="center">Aurora events é uma plataforma de divulgação de eventos onde é possivel publicar e descobrir novos eventos incríveis.</h4>

<p align="center">
  <img alt="Linguagem mais usada" src="https://img.shields.io/github/languages/top/marcosribeirodacunha/aurora-events-api?style=flat">
  <img alt="Objetivo: estudo" src="https://img.shields.io/badge/purpose-study-lightgrey?style=flat">
</p>

<p align="center">
  <a href="#recursos">Recursos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#insomnia">Insomnia</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#licença">Licença</a>
</p>

## Recursos

- [x] Cadastro, listagem e deleção de usuários
- [x] Atualização de avatar do usuário
- [x] Criação de sessão com JWT
- [x] Criação, listagem e deleção de eventos
- [x] Atualização de dados e foto dos eventos
- [x] Like e Dislike em eventos

## Instalação

Para clonar e executar esta aplicação é necessário possuir instalado [Git](https://git-scm.com/) e [NodeJS](https://nodejs.org/en/download/) (que instala também o [npm](https://www.npmjs.com/)). Em sua linha de comando:

```bash
# Clone o repositório
$ git clone https://github.com/marcosribeirodacunha/aurora-events-api.git

# Entre no repositório
$ cd aurora-api

# Instale as dependências
$ npm install
// ou yarn
```

### Banco de dados

Esta aplicação utiliza como banco de dados o [Postgres](https://www.postgresql.org/) em um container do [Docker](https://www.docker.com/). Entretanto é possivel utilizar o banco instalado localmente.

Antes de realizar as migrations realize os seguintes passos:

- Renomeie o arquivo `.env.example` para `.env`
- Altere as variáveis faltantes de acordo com os dados do banco de dados postgreSQL no qual utilizará
- Crie um banco de dados com o mesmo nome daquele contido na variável `TYPEORM_DATABASE` do arquivo `.env`;
- Verifique se o banco de dados criado possui a extensão `uuid-ossp` habilitada. Caso não possua, habilite esta extensão.

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

## Insomnia

Para testar a aplicação utilizando o [Insomnia](https://insomnia.rest/) clique no botão abaixo para criar um workspace com todas as rotas necessárias.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Aurora_Events_API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fmarcosribeirodacunha%2Faurora-events-api%2Fmaster%2Fgithub%2Finsomnia_workspace.json)

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [Postgres](https://www.postgresql.org/)
- [JSON Web Token](https://jwt.io/)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
