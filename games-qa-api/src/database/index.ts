import { createConnection } from "typeorm";

createConnection({
  type: "mysql",
  host: "localhost",
  port: parseInt(process.env.MYQL_TCP_PORT),
  username: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: false,
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/entities/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/entities",
  },
});
