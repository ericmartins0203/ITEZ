import AppDataSource from "../../data-source";
import Received from "../../entities/Received";
import User from "../../entities/User";
import { IReceived } from "../../Interfaces/Received.interface";

const updateReceivedService = async (
  userId: string,
  receivedId: string,
  received: IReceived
) => {
  const userRepository = AppDataSource.getRepository(User);
  const receivedRepository = AppDataSource.getRepository(Received);

  const user = await userRepository.findOne({ where: { id: userId } });
  const updateReceived = await receivedRepository.findOne({
    where: { id: receivedId },
  });

  if (user && updateReceived) {
    const newReceived = receivedRepository.create({
      ...updateReceived,
      ...received,
    });

    await receivedRepository.save(newReceived);

    await userRepository.update(
      { id: userId },
      { balance: user.balance - (updateReceived.value - received.value) }
    );

    return newReceived;
  }
  throw new Error("Received id not found!");
};

export default updateReceivedService;
