import faker from "@faker-js/faker";
import { existsSync } from "fs";
import { unlink } from "fs/promises";
import path from "path";
import AppDataSource from "../data-source";

import { ICreateUser } from "../Interfaces/User.interface";

const generateUser = (): ICreateUser => {
  const name = faker.name.firstName().toLowerCase();
  const email = faker.internet.email(name).toLowerCase();
  const password = faker.random.alpha(6);

  return {
    name,
    email,
    password,
  };
};

class ConnectionTestJest {
  dbPath: string;

  constructor() {
    this.dbPath = path.join(__dirname, "../../dbTest.sqlLite");
  }

  create = async () => {
    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }

    await AppDataSource.initialize();
  };

  close = async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();

    if (existsSync(this.dbPath)) {
      await unlink(this.dbPath);
    }
  };

  clear = async () => {
    const connection = AppDataSource;
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  };
}

export { ConnectionTestJest, generateUser };
