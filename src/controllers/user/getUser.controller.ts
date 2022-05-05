import { Request, Response } from "express";
import getUserService from "../../services/User/getUser.service";

const getUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;

    const user = await getUserService(userId);

    return res
      .status(200)
      .json({ message: "User retrieved successfully", user });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.name, err: err.message });
    }
  }
};

export default getUserController;
