
[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  

## Description

This project is the authentication service of DLabs. This means that all Dlabs services will use this as
its authentication gateway. Only one instance of this app will be provisioned across DLabs.

## Dev Rules
```bash
Before working on a feature. Create a branch for that feature.

Only merge code to the dev branch with a PR. This means never merge a code to dev alone.

Make your Pull Request as small as possible.

Write Test, Write Test !!! Like really write Test E2E , Unit. 

But E2E makes lot of sense. Test never go wrong

```

## Installation

```bash
$ npm install
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Built With

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [The devs at Dlabs](oluwatobi.t.adenekan@gmail.com)


