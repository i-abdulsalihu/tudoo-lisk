import { toast } from "sonner";
import { Contract } from "ethers";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

import { truncateAddr } from "@/lib/utils";
import { useFetch } from "@/hooks/useFetch";
import { getTaskContract } from "@/services";
import Wrapper from "@/components/shared/wrapper";
import { getAllTasks } from "@/services/serviceFn";
import CreateTaskForm from "@/components/shared/create";
import ClearAllTasks from "@/components/shared/clear-tasks";
import TaskContainer from "@/components/shared/task-container";

export default function RootPage() {
  const { isConnected, address } = useAccount();
  const [todos, setTodos] = useState<InterfaceTodoListProps[]>([]);
  const [contract, setContract] = useState<Contract | null>(null);

  const {
    fn: getAllTasksFn,
    data: tasks,
    isLoading: isFetchingTasks,
  } = useFetch(getAllTasks);

  useEffect(() => {
    getAllTasksFn();
  }, [getAllTasksFn, address]);

  // Update todos when tasks are fetched
  useEffect(() => {
    if (tasks) {
      const newTasks = tasks.map((t: InterfaceTodoListProps) => ({
        id: t.id,
        content: t.content,
        isCompleted: t.isCompleted,
        createdAt: new Date(t.createdAt),
      }));

      setTodos(newTasks.sort((a: any, b: any) => b.createdAt - a.createdAt));
    }
  }, [tasks]);

  // Initialize the contract and setup event listeners
  useEffect(() => {
    const initContract = async () => {
      const contractInstance: Contract = await getTaskContract();

      setContract(contractInstance);

      // Listen for contract events
      contractInstance.on(
        "TaskCreatedEvent",
        (user: string, taskId: number, content: string, createdAt: string) => {
          console.log(user, taskId, content, createdAt);
          const newTask = {
            id: taskId,
            content,
            isCompleted: false,
            createdAt: new Date(createdAt),
          };
          setTodos((prev) => [newTask, ...prev]); // Add new task at the top
          toast.success(`"${truncateAddr(content, 8)}" created successfully`);
        }
      );

      contractInstance.on(
        "TaskStatusUpdatedEvent",
        (user: string, taskId: number, isCompleted: boolean) => {
          console.log(user, taskId, isCompleted);
          setTodos((prev) =>
            prev.map((task) =>
              task.id === taskId ? { ...task, isCompleted } : task
            )
          );
          toast.success(`Task "${taskId}" updated successfully`);
        }
      );

      contractInstance.on(
        "TaskDeletedEvent",
        (user: string, taskId: number) => {
          console.log(user, taskId);
          setTodos((prev) => prev.filter((task) => task.id !== taskId));
          toast.success(`Task "${taskId}" deleted successfully`);
        }
      );

      contractInstance.on("TaskCleared", (user: string) => {
        setTodos([]);
        toast.success(`All "${truncateAddr(user)}" tasks deleted`);
      });
    };

    initContract();

    return () => {
      if (contract) {
        contract.removeAllListeners("TaskCreatedEvent");
        contract.removeAllListeners("TaskStatusUpdatedEvent");
        contract.removeAllListeners("TaskDeletedEvent");
        contract.removeAllListeners("TaskCleared");
      }
    };
  }, [contract]);

  return (
    <Wrapper className="flex flex-col w-full h-[calc(100%-80px)] py-10 relative">
      {isConnected ? (
        <div className="mx-auto max-w-3xl size-full flex flex-col gap-8 flex-1">
          <div className="flex items-center justify-between px-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-normal">
                👋 Welcome, {truncateAddr(address)}
              </h1>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Let's see what we've got to do today.
              </p>
            </div>

            {todos.length > 0 && <ClearAllTasks />}
          </div>

          <TaskContainer todos={todos} isFetchingTasks={isFetchingTasks} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <MdSignalWifiStatusbarConnectedNoInternet className="size-20 text-blue-500 z-50" />
          <p className="text-lg font-normal text-blue-500">
            No account connected
          </p>
        </div>
      )}

      <CreateTaskForm />
    </Wrapper>
  );
}
