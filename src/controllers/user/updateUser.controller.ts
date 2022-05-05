import { Request, Response } from "express";
import { ICreateUser } from "../../Interfaces/User.interface";
import { updateUserService } from "../../services/User";

const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { name, email, password } = req.validate as ICreateUser;

    const updatedUser = await updateUserService(
      userId as string,
      name,
      email,
      password
    );

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default updateUserController;
