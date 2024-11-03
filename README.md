# Notebook Store Framework test automation

## Getting Started

This is a test automation framework to create and run E2E scenarios

### Requirements:

- node >= 20.12.x - ([how to install Node](https://nodejs.org/en/download/))
- npm >= 10.5.x - ([how to install NPM](https://docs.npmjs.com/getting-started))

### Features:

- [TypeScript](https://www.typescriptlang.org/)
- [WebdriverIO](https://webdriver.io/)
- [Allure Report](https://docs.qameta.io/allure/#_about)
- [ESlint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Commit lint](https://github.com/conventional-changelog/commitlint)

## Installation

Clone the repo:

        git clone https://github.com/AntonKruhlou/enotes-framework.git

Install the dependencies:

        npm install

## Environment

Set environment:

        export ENV=stage

or

        export ENV=dev

## Test

Run tests for Chrome:

        npm run test:web:local:chrome

Run tests for Safari:

        npm run test:web:local:safari

## Reports

Run this command to generate the allure report:

        npm run report:generate

You can run this command to start a server on your machine and open the allure report on the browser:

        npm run report:open
