import { NextFunction, Request, Response } from "express";
import { IExpend } from "../Interfaces/Expend.interface";

const validType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validate = req.validate as IExpend;
    if (
      validate.type.toLowerCase() === "entretenimento" ||
      validate.type.toLowerCase() === "alimentação" ||
      validate.type.toLowerCase() === "educação" ||
      validate.type.toLowerCase() === "saúde" ||
      validate.type.toLowerCase() === "transporte"
    ) {
      console.log("hue");
      return next();
    }
  } catch (error: any) {
    return res.status(400).json({
      error:
        "Tipo de despesa inválido, deveria ser: entretenimento, alimentação, educação, saúde, transporte",
    });
  }
};

export { validType };
