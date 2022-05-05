import { Request, Response } from "express";
import { IReceived } from "../../Interfaces/Received.interface";
import { createReceivedService } from "../../services/Received";

const createReceivedController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { value, date, description } = req.validate as IReceived;

    const newReceived = await createReceivedService(userId as string, {
      value,
      date,
      description,
    });

    return res
      .status(201)
      .json({ message: "Received created successfully", newReceived });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).json({ error: err.message });
    }
  }
};

export default createReceivedController;
