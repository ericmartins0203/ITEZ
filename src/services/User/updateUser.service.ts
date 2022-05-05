import { hash } from "bcryptjs";
import AppDataSource from "../../data-source";
import User from "../../entities/User";

const updateUserService = async (
  userId: string,
  name: string,
  email: string,
  password: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  if (name && name !== user.name) {
    await userRepository.update({ id: userId }, { name });
  }
  if (email && email !== user.email) {
    await userRepository.update({ id: userId }, { email });
  }
  if (password && password !== user.password) {
    const newpassword = await hash(password, 10);
    await userRepository.update({ id: userId }, { password: newpassword });
  }

  user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return { name: user.name, email: user.email, balance: user.balance };
};

export default updateUserService;
