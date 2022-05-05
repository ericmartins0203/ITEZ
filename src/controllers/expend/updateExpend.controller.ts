import { Request, Response } from "express";
import { IExpend } from "../../Interfaces/Expend.interface";
import { updateExpendService } from "../../services/Expend";

const UpdateExpendController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { expendId } = req.params;
    const { value, date, type, description } = req.validate as IExpend;
    const newExpend = await updateExpendService(
      userId as string,
      expendId as string,
      {
        value,
        date,
        type,
        description,
      }
    );

    return res
      .status(200)
      .json({ message: "Expend updated successfully", newExpend });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default UpdateExpendController;
