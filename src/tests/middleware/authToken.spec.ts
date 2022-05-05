import { NextFunction, Request, Response } from "express";
import jest from "@jest/globals";
import { sign } from "jsonwebtoken";

import { generateUser } from "..";

import { authToken } from "../../middlewares/authToken.middleware";
import config from "../../configs/config";

jest.describe("unit test for validateToken middleware", () => {
  const mockReq: Partial<Request> = {};
  const mockRes: Partial<Response> = {};
  const mockNext: Partial<NextFunction> = jest.fn();

  jest.beforeEach(() => {
    mockRes.json = jest.fn().mockReturnValue(mockRes);
    mockRes.status = jest.fn().mockReturnValue(mockRes);
  });

  jest.it(
    "will return error message if missing token. Status 401 | Missing authorization headers ",
    () => {
      mockReq.headers = {
        authorization: undefined,
      };
      authToken(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      jest.expect(mockRes.status).toBeCalled();
      jest.expect(mockRes.status).toBeCalledWith(401);

      jest.expect(mockRes.json).toBeCalled();
      jest.expect(mockRes.json).toBeCalledWith({
        message: "Missing authorization headers",
      });
    }
  );

  jest.it(
    "will return error message if token is malformed. Status 401 | jwt malformed",
    () => {
      mockReq.headers = {
        authorization: "Bearer invalidToken",
      };
      authToken(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      jest.expect(mockRes.status).toBeCalled();
      jest.expect(mockRes.status).toBeCalledWith(401);

      jest.expect(mockRes.json).toBeCalled();
      jest.expect(mockRes.json).toBeCalledWith({
        error: "jwt malformed",
      });
    }
  );

  jest.it(
    "will return error message if token is invalid. Status 401 | Invalid token",
    () => {
      const invalidToken = sign({ ...generateUser() }, "fakeSecret");
      mockReq.headers = {
        authorization: `Bearer ${invalidToken}`,
      };
      authToken(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      jest.expect(mockRes.status).toBeCalled();
      jest.expect(mockRes.status).toBeCalledWith(401);

      jest.expect(mockRes.json).toBeCalled();
      jest.expect(mockRes.json).toBeCalledWith({
        error: "invalid signature",
      });
    }
  );

  jest.it("will call next function and key decoded on mockReq object", () => {
    const { secret, expiresIn } = config;
    const user = generateUser();
    const token = sign({ ...user }, secret, { expiresIn });

    mockReq.headers = {
      authorization: `Bearer ${token}`,
    };
    authToken(
      mockReq as Request,
      mockRes as Response,
      mockNext as NextFunction
    );

    jest.expect(mockNext).toBeCalled();
    jest.expect(mockNext).toBeCalledTimes(1);

    jest.expect(mockReq).toHaveProperty("decoded");
  });
});
