import AppDataSource from "../../data-source";
import Received from "../../entities/Received";
import User from "../../entities/User";
import { IReceived } from "../../Interfaces/Received.interface";

const createReceivedService = async (userId: string, received: IReceived) => {
  const userRepository = AppDataSource.getRepository(User);
  const receivedRepository = AppDataSource.getRepository(Received);

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found!");
  }

  let newReceived = receivedRepository.create({
    ...received,
    user,
  });

  newReceived = await receivedRepository.save(newReceived);

  await userRepository.update(
    { id: userId },
    { balance: user.balance + received.value }
  );

  return {
    id: newReceived.id,
    value: newReceived.value,
    date: newReceived.date,
    description: newReceived.description,
  };
};

export default createReceivedService;
