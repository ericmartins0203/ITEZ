import User from "../../entities/User";
import ErrorHTTP from "../../error/ErrorHTTPS";
import { ILoginUser } from "../../Interfaces/User.interface";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import config from "../../configs/config";
import AppDataSource from "../../data-source";

const loginUserService = async ({ email, password }: ILoginUser) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ErrorHTTP("Wrong email or password!", 401);
  }

  const isPasswordCorrect = await compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new ErrorHTTP("Wrong email or password!", 401);
  }

  const token = jwt.sign({ userId: user.id }, config.secret as string, {
    expiresIn: config.expiresIn,
  });

  return token;
};

export default loginUserService;
