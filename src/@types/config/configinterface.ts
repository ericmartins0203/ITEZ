interface IConfig {
  secret: string;
  expiresIn: string;
  username: string;
  password?: string;
  database: string;
  port: number;
  host: string;
  node_env: string;
}

export default IConfig;
