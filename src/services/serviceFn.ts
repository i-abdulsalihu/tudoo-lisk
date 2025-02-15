import { Contract, TransactionReceipt } from "ethers";
import { ensureEthereumAvailable, getTaskContract } from ".";

export const getAllTasks = async () => {
  await ensureEthereumAvailable();

  try {
    const contract: Contract = await getTaskContract();
    const tasks: InterfaceTodoListProps[] = await contract.getAllTasks();

    if (!tasks || tasks.length === 0) return [];

    const refinedData = tasks.map((task: InterfaceTodoListProps) => ({
      id: task?.id,
      content: task?.content,
      createdAt: task?.createdAt,
      isCompleted: task?.isCompleted,
    }));

    return refinedData;
  } catch (error) {
    reportError(error);
    throw error;
  }
};

export const createTask = async (content: string, createdAt: string) => {
  await ensureEthereumAvailable();

  try {
    const contract: Contract = await getTaskContract();
    const transaction: Contract = await contract.createTask(content, createdAt);

    const receipt: TransactionReceipt = await transaction.wait();
    if (!receipt || receipt.status !== 1) {
      throw new Error("Failed to create task");
    }

    return receipt;
  } catch (error: any) {
    if (error.code === "ACTION_REJECTED") {
      throw new Error("Transaction rejected by user");
    } else if (error.code === "INSUFFICIENT_FUNDS") {
      throw new Error("Insufficient funds for gas");
    } else if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
      throw new Error("Transaction may fail");
    }

    reportError(error);
    throw error.message;
  }
};

export const updateStatusById = async (taskId: number) => {
  await ensureEthereumAvailable();

  try {
    const contract: Contract = await getTaskContract();
    const transaction: Contract = await contract.updateStatusById(
      Number(taskId)
    );

    const receipt: TransactionReceipt = await transaction.wait();
    if (!receipt.status) {
      throw new Error("Transaction failed");
    }

    return receipt;
  } catch (error: any) {
    reportError(error);
    throw error.message;
  }
};

export const deleteTaskById = async (taskId: number) => {
  await ensureEthereumAvailable();

  try {
    const contract: Contract = await getTaskContract();
    const transaction: Contract = await contract.deleteTaskById(Number(taskId));

    const receipt: TransactionReceipt = await transaction.wait();
    if (!receipt.status) {
      throw new Error("Transaction failed");
    }

    return receipt;
  } catch (error: any) {
    reportError(error);
    throw error.message;
  }
};

export const deleteAllTasks = async () => {
  await ensureEthereumAvailable();

  try {
    const contract: Contract = await getTaskContract();
    const transaction: Contract = await contract.deleteAllTasks();

    const receipt: TransactionReceipt = await transaction.wait();
    if (!receipt.status) {
      throw new Error("Transaction failed");
    }

    return receipt;
  } catch (error: any) {
    reportError(error);
    throw error.message;
  }
};
