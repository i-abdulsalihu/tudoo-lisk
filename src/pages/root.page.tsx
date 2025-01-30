import { useAccount } from "wagmi";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

import Wrapper from "@/components/shared/wrapper";
import { truncateAddr } from "@/lib/utils";
import CreateTaskForm from "@/components/shared/create";
import TaskContainer from "@/components/shared/task-container";
import { useEffect, useState } from "react";
import { initialTodos } from "@/lib/constants";
import ClearAllTasks from "@/components/shared/clear-tasks";

export default function RootPage() {
  const { isConnected, address } = useAccount();

  const [todos, setTodos] = useState<InterfaceTodoListProps[]>([]);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

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

            {todos.length > 0 && <ClearAllTasks setTodos={setTodos} />}
          </div>

          <TaskContainer setTodos={setTodos} todos={todos} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <MdSignalWifiStatusbarConnectedNoInternet className="size-20 text-blue-500 z-50" />
          <p className="text-lg font-normal text-blue-500">
            No account connected
          </p>
        </div>
      )}

      <CreateTaskForm setTodos={setTodos} />
    </Wrapper>
  );
}
