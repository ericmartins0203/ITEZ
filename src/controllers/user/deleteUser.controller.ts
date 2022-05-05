import { Request, Response } from "express";
import { deleteUserService } from "../../services/User";

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const deletedUser = deleteUserService(userId as string);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default deleteUserController;
