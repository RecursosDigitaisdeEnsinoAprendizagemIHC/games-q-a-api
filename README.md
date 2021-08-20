# games-q-a-api

## Getting Started

First, create a file with .env in the root directory of the project. Place your configuration in the env file.

Example:

```
MYSQL_ROOT_PASSWORD=somepass
MYSQL_DATABASE=games-qa
MYSQL_TCP_PORT=5432
```

Second, run the development server:

```bash
docker-compose up --build
```

The API can be accessed by http://localhost:8080.
