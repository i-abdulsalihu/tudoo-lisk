import { AnimatePresence } from "framer-motion";
import { LuInbox } from "react-icons/lu";
import TodoList from "./todo-list";
import { Skeleton } from "../ui/skeleton";

export default function TaskContainer(props: InterfaceTaskContainerProps) {
  return (
    <div className="px-4 h-full flex flex-col gap-3 overflow-y-auto overflow-x-clip max-h-[calc(80%)]">
      <AnimatePresence>
        {props.isFetchingTasks ? (
          Array.from({ length: 8 }).map((_, _index) => (
            <Skeleton
              key={_index}
              className="relative flex w-full items-start gap-3 h-14 [&:nth-child(2)]:h-24 [&:nth-child(4)]:h-24 [&:nth-child(5)]:h-24 [&:nth-child(8)]:h-24 rounded-lg border border-zinc-900 bg-secondary p-4 transition-opacity"
            />
          ))
        ) : props.todos.length === 0 ? (
          <p className="flex-1 h-full flex flex-col items-center justify-center mb-12 text-muted-foreground">
            <LuInbox className="size-24" />
            <span className="text-sm uppercase tracking-wider">
              Empty task, create a new task
            </span>
          </p>
        ) : (
          props.todos?.map((todo: InterfaceTodoListProps) => (
            <TodoList key={todo.id} todo={todo} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
