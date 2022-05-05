import AppDataSource from "../../data-source";
import User from "../../entities/User";

const deleteUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  await userRepository.delete(user!.id);

  return user;
};

export default deleteUserService;
