AutoRia Clone - NestJS Backend
Description
This project is a backend clone of AutoRia built using the NestJS framework.

Project setup
To set up the project, run:
$ npm install

Run the project
Development
To run the project in development mode, use:
$ npm run start

Watch mode
To run the project in watch mode, use:
$ npm run start:local

Debug mode
To run the project in debug mode, use:
$ npm run start:debug

Production mode
To run the project in production mode, use:
$ npm run start:prod

Docker setup
Build and start containers (local)
To build and start Docker containers for local development, use:
$ npm run start:docker:local

Migrations
Create a migration
To create a new migration, use:
$ npm run migration:create --name=MigrationName

Generate a migration
To generate a new migration based on changes in entities, use:
$ npm run migration:generate --name=MigrationName

Run migrations
To run all pending migrations, use:
$ npm run migration:run

Revert the last migration
To revert the last migration, use:
$ npm run migration:revert

Husky
Husky is used for managing git hooks to ensure code quality before commits. It runs linting on staged files.

To set up Husky, use:
$ npm run prepare

Run end-to-end tests
To run end-to-end tests, use:
$ npm run test:e2e

License
This project is UNLICENSED.

Author
Oleksandr Semenets