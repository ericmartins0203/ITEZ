import { Request, Response } from "express";
import { IExpend } from "../../Interfaces/Expend.interface";
import { createExpendService } from "../../services/Expend";

const createExpendController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { value, date, type, description } = req.validate as IExpend;

    const newExpend = await createExpendService(userId as string, {
      value,
      date,
      type,
      description,
    });

    return res
      .status(201)
      .json({ message: "Expend created successfully", newExpend });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default createExpendController;
