import { Request, Response } from "express";
import { ICreateUser } from "../../Interfaces/User.interface";
import createUserService from "../../services/User/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.validate as ICreateUser;

    const user = await createUserService({ name, email, password });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default createUserController;
