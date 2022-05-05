import { Request, Response } from "express";
import { ILoginUser } from "../../Interfaces/User.interface";
import { loginUserService } from "../../services/User";

const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as ILoginUser;

    const token = await loginUserService({ email, password });

    return res.status(200).json({ message: "User loged successfully", token });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default loginUserController;
