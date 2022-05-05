import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import config from "./configs/config";

const DevSource = {
  type: config.node_env === "development" ? "postgres" : "sqlite",
  host: config.node_env === "development" ? config.host : "localhost",
  port: config.port,

  username: config.username,
  password: config.password,
  database: config.database,

  synchronize: true,
  logging: false,

  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/*.ts"],
} as DataSourceOptions;

const TestSource = {
  type: "sqlite",
  database: "/tmp/test.sqlite",

  synchronize: true,

  entities: ["src/entities/**/*.ts"],
} as DataSourceOptions;

export default config.node_env === "development"
  ? new DataSource(DevSource)
  : new DataSource(TestSource);
