import User from "../../entities/User";
import Expend from "../../entities/Expend";
import { IExpend } from "../../Interfaces/Expend.interface";
import AppDataSource from "../../data-source";

const createExpendService = async (userId: string, expend: IExpend) => {
  const userRepository = AppDataSource.getRepository(User);
  const expendRepository = AppDataSource.getRepository(Expend);

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found!");
  }

  let newExpend = expendRepository.create({
    ...expend,
    user,
  });

  await expendRepository.save(newExpend);

  await userRepository.update(
    { id: userId },
    { balance: user.balance - expend.value }
  );

  return {
    id: newExpend.id,
    value: newExpend.value,
    date: newExpend.date,
    description: newExpend.description,
  };
};

export default createExpendService;
