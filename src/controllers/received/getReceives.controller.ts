import { Request, Response } from "express";
import { getReceivedService } from "../../services/Received";

const getReceivedController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId as string;

    const received = await getReceivedService(userId);

    return res
      .status(200)
      .json({ message: "Received retrieved successfully", received });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default getReceivedController;
