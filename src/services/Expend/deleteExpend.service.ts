import AppDataSource from "../../data-source";
import Expend from "../../entities/Expend";
import User from "../../entities/User";

const deleteExpendService = async (userId: string, expendId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const expendRepository = AppDataSource.getRepository(Expend);

  const user = await userRepository.findOne({ where: { id: userId } });
  const expend = await expendRepository.findOne({ where: { id: expendId } });

  if (user && expend) {
    await expendRepository.delete(expend);
    await userRepository.update(
      { id: userId },
      { balance: user.balance + expend.value }
    );
    return expend;
  }
  throw new Error("Expend not found!");
};

export default deleteExpendService;
