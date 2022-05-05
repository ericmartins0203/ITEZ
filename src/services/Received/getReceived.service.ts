import AppDataSource from "../../data-source";
import User from "../../entities/User";

const getReceivedService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const received = await userRepository.findOne({
    where: { id: userId } as any,
    relations: ["receiveds"],
  });

  return received?.receiveds;
};

export default getReceivedService;
