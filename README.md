# fuego-de-quasar
fuego-de-uasar

[![node](https://img.shields.io/badge/node-v12.X-yellow.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-v6.13.X-red.svg)](https://www.npmjs.com/)
[![typescript](https://img.shields.io/npm/types/typescript)](https://www.typescriptlang.org/)

>Proyeccto en typescript
>

## Prerequisitos

Necesitas tener instaldo en el computador

* [Git](http://git-scm.com/)
* [Node](https://nodejs.org)
* [NPM](https://www.npmjs.com/)

## Instalación

* `git clone git@github.com/WilliamsMaldonado/fuego-de-uasar.git` 
* Ingresar al proyecto `cd fuego-de-uasar`

## Dependencias

correr `npm install` para instalar las dependencicas del proyeccto
* [inversify](http://inversify.io/)
* [ajv](https://github.com/ajv-validator/ajv)
* [fast-vector](https://github.com/PRNDcompany/fast-vector#readme)
* [http-status-codes](https://github.com/prettymuchbryce/http-status-codes#readme)
* [reflect-metadata](https://rbuckton.github.io/reflect-metadata/)

## Build

correr `npm run build` para construir el proyecto. El archivo .zip contiene el proyecto con sus dependencias necesarias en la carpeta `dist/`.

## Correr pruebas unitarias

correr `npm run test` para ejecutar las pruebas con [Jasmine](https://jasmine.github.io/).

correr `npm run coverage` para ejecutar las pruebas con cobertura, la cobertura se encuentra en la carpeta `coverage/lcov-report/index.html`

