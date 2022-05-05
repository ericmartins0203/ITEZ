import { IExpend } from "../../Interfaces/Expend.interface";
import { IReceived } from "../../Interfaces/Received.interface";
import { ICreateUser } from "../../Interfaces/User.interface";

declare global {
  namespace Express {
    export interface Request {
      validate: ICreateUser | IReceived | IExpend;
      userId?: string;
    }
  }
}
