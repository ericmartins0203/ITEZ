import User from "../../entities/User";
import Expend from "../../entities/Expend";
import AppDataSource from "../../data-source";

const getExpendService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const expendRepository = AppDataSource.getRepository(Expend);

  const user = await userRepository.findOne({ where: { id: userId } });

  if (user) {
    const expend = await expendRepository.find({ where: { user: user } });
    return expend;
  }
  return null;
};

export default getExpendService;
