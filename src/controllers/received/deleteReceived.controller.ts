import { Request, Response } from "express";
import { deleteReceivedService } from "../../services/Received";

const deleteReceivedController = (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { receivedId } = req.params;

    const deletedReceived = deleteReceivedService(
      userId as string,
      receivedId as string
    );

    return res
      .status(200)
      .json({ message: "Received deleted successfully", deletedReceived });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default deleteReceivedController;
