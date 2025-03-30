<img alt="Logo" src="./web/public/icon.svg" height="96px" />

# Forum

A simple forum application built with Java Spring Boot and Angular.

Frontend is hosted at [forum.merzin.dev](https://forum.merzin.dev).

## Running locally

To run the application locally, you need to have Java 21 and Node.js with npm
installed on your machine.

### Backend

1. Open the `api` directory in your terminal.
2. Copy the `.env.sample` file to `.env` and set the environment variables.
3. Run the `migrations.sql` file in your database.
4. Run the following command to start the application:

```bash
./gradlew bootRun
```

### Frontend

1. Open the `web` directory in your terminal.
2. Run the following command to install the dependencies:

```bash
npm install
```

3. Run the following command to start the application:

```bash
npm start
```
