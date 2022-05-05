import supertest from "supertest";
import jest from "@jest/globals";
import { ConnectionTestJest, generateUser } from "..";
import { app } from "../../app";

jest.describe("Create User", () => {
  jest.beforeAll(async () => {
    await new ConnectionTestJest().create();
  });

  jest.afterAll(async () => {
    await new ConnectionTestJest().clear();
    await new ConnectionTestJest().close();
  });

  jest.beforeEach(async () => {
    await new ConnectionTestJest().clear();
  });

  jest.it("will return status 201 and user as json response", async () => {
    const user = generateUser();

    const response = await supertest(app).post("/user/signup").send(user);

    jest.expect(response.status).toBe(201);
    jest.expect(response.body.user).toHaveProperty("name");
    jest.expect(response.body.user.name).toStrictEqual(user.name);
  });

  jest.it("will return status 400 and missing field", async () => {
    const user = { name: "test", email: "teste@gmail.com" };

    const response = await supertest(app).post("/user/signup").send(user);

    jest.expect(response.status).toBe(400);
  });

  jest.it("will return status 401 and user already exists", async () => {
    const user = generateUser();

    await supertest(app).post("/user/signup").send(user);
    const response = await supertest(app).post("/user/signup").send(user);

    jest.expect(response.status).toBe(401);
    jest.expect(response.body.error).toStrictEqual("User already exists");
  });
});
