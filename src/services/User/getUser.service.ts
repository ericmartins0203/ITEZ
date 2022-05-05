import AppDataSource from "../../data-source";
import User from "../../entities/User";

const getUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    balance: user.balance,
  };
};

export default getUserService;
