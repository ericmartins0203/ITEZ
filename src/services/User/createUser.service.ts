import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import User from "../../entities/User";
import { ICreateUser } from "../../Interfaces/User.interface";

const createUserService = async ({ name, email, password }: ICreateUser) => {
  const userRepository = AppDataSource.getRepository(User);

  const alreadyExist = await userRepository.findOne({
    where: { email },
  });
  if (alreadyExist) {
    throw new Error("User already exists");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await hash(password, 10);

  userRepository.create(user);

  await userRepository.save(user);

  return { name: user.name, email: user.email, balance: user.balance };
};

export default createUserService;
