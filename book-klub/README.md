# Book Klub

![Book Klub Logo](src/assets/img/book_klub_logo.png)

`Book Klub` é uma plataform virtual de clubes de livros, onde leitores podem se cadastrar, criar seus próprios clubes e agendar sessões de discussão sobre a obra que estão lendo.

Todos os usuários cadastrados podem criar e administrar seus próprios clubes, e outros usuários podem ingressar em clubes existentes.

## Índice

- [Book Klub](#book-klub)
  - [Índice](#índice)
  - [Sobre a aplicação](#sobre-a-aplicação)
    - [Features](#features)
    - [Tecnologias](#tecnologias)
  - [Instalação e uso](#instalação-e-uso)
    - [Utilizando o docker](#utilizando-o-docker)
    - [Utilizando um banco de dados local](#utilizando-um-banco-de-dados-local)
  - [Utilizando a API](#utilizando-a-api)
  - [Executando testes](#executando-testes)
  - [Desenvolvedores](#desenvolvedores)
      - [**Carlos**](#carlos)
      - [**Felipe**](#felipe)
      - [**Gabriela**](#gabriela)
      - [**Jamilly**](#jamilly)
      - [**Leo**](#leo)
      - [**Lorena**](#lorena)
  - [Licença de uso](#licença-de-uso)

## Sobre a aplicação

`Book Klub` foi desenvolvida em grupo durante a conclusão do módulo 4 do curso de desenvolvimento full stack da Kenzie Academy. A aplicação se propõe ser um tipo de rede social de leitura, onde leitores de todos os lugares podem se reunir em grupos de discussão - os clubes de leitura - e debater sobre a obra que estão lendo.

### Features

Na aplicação existem diversas funcionalidades com as quais os usários podem interagir para criar um ambiente ideal para organizar seus encontros, dentre elas, as principais são:

- Cadastro e login de usuários, com criptografia e validação de senhas
- Cadastro de novos clubes, com a possibilidade de adicionar os livros lidos aos clubes, além de atualização dos dados de um clube e remoção do clube
- Cadastro de livros e categorias

### Tecnologias

Para construir e executar Book Klub, utilizamos as seguintes tecnologias:

1. Node.js
2. Express
3. TypesORM
4. PostgreSQL

## Instalação e uso

Faça o `fork` do repositório e em seguida execute o comando `git clone` para clonar o projeto para seu dispositivo. Dentro da pasta do projeto, execute o comando abaixo para instalar todas as dependências da aplicação.

```
yarn install
```

É possível executar a aplicação tanto dentro de um container Docker, quanto localmente, utilizando um banco de dados PostgreSQL.

### Utilizando o docker

Após o comando `yarn install`, utilize o comando abaixo para executar a aplicação utilizando um container docker - é necessário ter o Docker Desktop instalado no Windows e Mac, ou Docker Compose no Linux.

```
docker-compose --build
```

Em seguida, para executar a imagem, utilize o seguinte comando:

```
docker-compose up
```

A aplicação agora estará em execução e pode ser acessada em:

```
http://localhost:3000
```

### Utilizando um banco de dados local

Caso não queira utilizar o docker, é possível executar a aplicação em um servidor local, utilizando um banco de dados PostgreSQL.

Para isto, basta editar o arquivo `.env.example` e alterar as linhas:

```
SECRET_KEY=
DATABASE_URL="postgres://<username>:<password>@<host>:<port>/<database>"
```

Em `SECRET_KEY`, insira os dados da secret key que pretende utilizar - é possível utilizar qualquer string como a secret key.

Em `DATABASE_URL`, substitua os dados `username`, `password` e `database` pelas informações do seu banco de dados PostgreSQL. Substitua `host` e `port` pelos valores de sua preferência. Exemplo:

```
SECRET_KEY=123456
DATABASE_URL="postgres://admin:1234@localhost:5432/bookklub"
```

Em seguida, altere o nome do arquivo de `.env.example` para `.env`. Para executar a aplicação, utilize o comando:

```
yarn dev
```

## Utilizando a API

Para utilizar a API `Book Klub`, acesse a [documentação do projeto](https://insomnia-doc-nine.vercel.app/).

Na documentação você poderá encontrar todos os endpoints da aplicação e mais sobre como utilizar a API em seus próprios projetos e aplicações.

## Executando testes

Foram desenvolvidos diversos testes de integração utilizando `Jest` para a aplicação. Para executar todos os testes, utilize o comando:

```
yarn test
```

Caso queira executar apenas os testes de uma rota específica, basta utilizar o mesmo comando acima, seguido do nome da rota, como no exemplo abaixo:

```
yarn test "/users"
```

## Desenvolvedores

#### **Carlos**

- [Github](https://github.com/chrds1)

#### **Felipe**

- [Github](https://github.com/Felipecmc)

#### **Gabriela**

- [Github](https://github.com/Gabriela-LC)

#### **Jamilly**

- [Github](https://github.com/jamilylima)

#### **Leo**

- [Github](https://github.com/Leeo-Henrique)

#### **Lorena**

- [Github](https://github.com/lorenammp)

## Licença de uso

`Book Klub` é um software open source com uma licença [MIT](LICENSE.md)
