import { Request, Response } from "express";
import { IReceived } from "../../Interfaces/Received.interface";
import { updateReceivedService } from "../../services/Received";

const UpdateReceivedController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { receivedId } = req.params;
    const { value, date, description } = req.validate as IReceived;

    const newReceived = await updateReceivedService(
      userId as string,
      receivedId as string,
      {
        value,
        date,
        description,
      }
    );

    return res
      .status(200)
      .json({ message: "Received updated successfully", newReceived });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default UpdateReceivedController;
