import { Request, Response } from "express";
import { IExpend } from "../../Interfaces/Expend.interface";
import { getExpendService } from "../../services/Expend";

const getExpendController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const newExpend = await getExpendService(userId as string);

    return res
      .status(200)
      .json({ message: "Expend retrieved successfully", newExpend });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default getExpendController;
