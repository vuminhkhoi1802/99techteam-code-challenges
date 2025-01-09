# NestJS CRUD with SQLite

A simple **CRUD** service built with [NestJS](https://docs.nestjs.com/) and [TypeORM](https://typeorm.io/) using **SQLite** for data persistence.

## Features

1. **Create an Item** (POST `/items`)
2. **List Items** (GET `/items`)
3. **Get Item Detail** (GET `/items/:id`)
4. **Update an Item** (PATCH `/items/:id`)
5. **Delete an Item** (DELETE `/items/:id`)

## Requirements

- **Node.js** v18+ (or your chosen LTS)
- **npm** or **yarn**
- (Optional) **Docker** & **docker-compose** if you want to run via containers

---

## Running Locally

1. **Install Dependencies**
```bash
npm install
# or
yarn
```

2. **Build the App**
```bash
npm run build
# or
yarn build
```

3. **Run the App**
```bash
npm run start
# or
yarn start
```

The service should be running at http://localhost:3000.

4. (Optional) Running in Development mode
```bash
npm run start:dev
# or
yarn start:dev
```

## Running with Docker

1. **Build the Docker Image**
```bash
docker-compose build
```

2. **Run the Docker Container**
```bash
docker-compose up
```
## Swagger Documentation

The API documentation is available at http://localhost:3000/api.

## Testing
### Why Jest for Unit Testing?
I chose Jest because:

- **Built-in with NestJS**: NestJS configures Jest by default, so it’s easy to get started.
- **TypeScript Support**: Jest works seamlessly with TypeScript, offering type checking and a smooth developer experience.
- **Fast and Mature**: Jest is known for its speed, rich API (mocks, spies, snapshots), and widespread community support.

## Why SuperTest for Integration (E2E) Testing?
I use SuperTest because:

Simple HTTP Assertions: SuperTest makes it straightforward to send HTTP requests to a running server and assert on the responses.
Compatible with Express Under the Hood: NestJS uses Express (by default) for its HTTP layer, so SuperTest integrates naturally.
Widely Adopted: SuperTest is a standard library in the Node.js world for end-to-end testing, with a large community and robust documentation.
Running the Tests
Unit Tests:

```bash
npm run test
# or
yarn test
```
This will run Jest-based tests that focus on individual classes, using mocks and stubs (e.g., service and controller unit tests).

Integration/E2E Tests:

```bash
npm run test:e2e
# or
yarn test:e2e
```
This will spin up the NestJS application in memory and use SuperTest to call the actual endpoints. You can configure a separate .env.test or in-memory DB if desired.



## Why NestJS?

- **TypeScript-First**: Built for TypeScript from the start, offering strong typing and compile-time checks.
- **Opinionated but Extensible**: Enforces a structured approach (modules, services, controllers) yet remains flexible.
- **Built-In Dependency Injection**: Encourages clean, testable code.
- **Scalable Architecture**: Easily split features into modules for maintainability as the application grows.

## Why SQLite?

- **Zero Configuration**: No setup required, just a single file.
- **Serverless**: No separate server process to manage.
- **Cross-Platform**: Works on Windows, macOS, and Linux.