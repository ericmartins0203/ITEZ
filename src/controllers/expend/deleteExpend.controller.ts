import { Request, Response } from "express";
import { deleteExpendService } from "../../services/Expend";

const deleteExpendController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { expendId } = req.params;
    const newExpend = await deleteExpendService(
      userId as string,
      expendId as string
    );

    return res
      .status(200)
      .json({ message: "Expend deleted successfully", newExpend });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default deleteExpendController;
