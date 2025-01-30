import { AnimatePresence } from "framer-motion";
import { LuInbox } from "react-icons/lu";
import TodoList from "./todo-list";

export default function TaskContainer(props: InterfaceTaskContainerProps) {
  return (
    <div className="px-4 h-full flex flex-col gap-3 overflow-y-auto overflow-x-clip max-h-[calc(80%)]">
      <AnimatePresence>
        {props.todos.length === 0 ? (
          <p className="flex-1 h-full flex flex-col items-center justify-center mb-12 text-muted-foreground">
            <LuInbox className="size-24" />
            <span className="text-sm uppercase tracking-wider">
              Empty task, create a new task
            </span>
          </p>
        ) : (
          props.todos?.map((todo: InterfaceTodoListProps) => (
            <TodoList key={todo.id} setTodos={props.setTodos} todo={todo} />
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
