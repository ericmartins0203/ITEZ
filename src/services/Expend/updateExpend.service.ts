import AppDataSource from "../../data-source";
import Expend from "../../entities/Expend";
import User from "../../entities/User";
import { IExpend } from "../../Interfaces/Expend.interface";

const updateExpendService = async (
  userId: string,
  expendId: string,
  expend: IExpend
) => {
  const userRepository = AppDataSource.getRepository(User);
  const expendRepository = AppDataSource.getRepository(Expend);

  const user = await userRepository.findOne({ where: { id: userId } });
  const updateExpend = await expendRepository.findOne({
    where: { id: expendId },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  if (!updateExpend) {
    throw new Error("Expend id not found!");
  }

  const newExpend = expendRepository.create({
    ...updateExpend,
    ...expend,
  });

  await expendRepository.save(newExpend);

  await userRepository.update(
    { id: userId },
    { balance: user.balance - (updateExpend?.value - expend.value) }
  );

  return newExpend;
};

export default updateExpendService;
