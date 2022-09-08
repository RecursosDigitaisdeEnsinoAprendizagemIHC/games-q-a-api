import { createConnection } from "typeorm";

createConnection({
  type: "mysql",
  host: "db",
  port: 5432,
  username: "root",
  password: 'somepass',
  database: 'games-qa',
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/entities/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/entities",
  },
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(err);
  });
