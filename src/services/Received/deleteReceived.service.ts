import AppDataSource from "../../data-source";
import Received from "../../entities/Received";
import User from "../../entities/User";

const deleteReceivedService = async (userId: string, receivedId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const receivedRepository = AppDataSource.getRepository(Received);

  const deletedReceived = await receivedRepository.findOne({
    where: { id: receivedId },
  });

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (user && deletedReceived) {
    await userRepository.update(
      { id: userId },
      { balance: user.balance - deletedReceived.value }
    );
  }

  await receivedRepository.delete({ id: receivedId });

  return deletedReceived;
};

export default deleteReceivedService;
