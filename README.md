# AutoRia Clone - NestJS Backend
### Description
This project is a backend clone of AutoRia built using the NestJS framework.

## Project setup
To set up the project, run:
```bash
$ npm install
```

## Create local.env file
To do local.env file with following settings:
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgresuser
POSTGRES_PASSWORD=postgrespassword
POSTGRES_DB=autoRia-clone

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redispassword

AWS_ACCESS_KEY=awsackey
AWS_SECRET_KEY=awssekey
AWS_S3_REGION="us-west-1"
AWS_S3_BUCKET_NAME="bucket-autoria-clone"
```

## Run the project with watch mode
To run the project in watch mode, use:
```bash
$ npm run start:local
```

## Debug mode
To run the project in debug mode, use:
```bash
$ npm run start:debug
```

## Production mode
To run the project in production mode, use:
```bash
$ npm run start:prod
```

## Docker setup
Build and start containers (local)
To build and start Docker containers for local development, use:
```bash
$ npm run start:docker:local
```

## Migrations
Create a migration
To create a new migration, use:
```bash
$ npm run migration:create --name=MigrationName
```

## Generate a migration
To generate a new migration based on changes in entities, use:
```bash
$ npm run migration:generate --name=MigrationName
```

## Run migrations
To run all pending migrations, use:
```bash
$ npm run migration:run
```

## Revert the last migration
To revert the last migration, use:
```bash
$ npm run migration:revert
```


## License
This project is UNLICENSED.

## Author
[Oleksandr Semenets](https://www.linkedin.com/in/alexandrsemenets/)