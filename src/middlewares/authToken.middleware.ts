import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../configs/config";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(
      token as string,
      config.secret as string,
      (err: any, decoded: any) => {
        req.userId = decoded.userId;
      }
    );
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export { authToken };
