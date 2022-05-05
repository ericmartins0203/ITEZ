import dotenv from "dotenv";
import IConfig from "../@types/config/configinterface";

dotenv.config();

const config: IConfig = {
  secret: process.env.JWT_SECRET || "",
  expiresIn: process.env.EXPIRES_IN || "4h",
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || "crud_node",
  port: Number(process.env.PGPORT),
  host: process.env.DB_HOST || "localhost",
  node_env: process.env.NODE_ENV || "development",
};

export default config;
