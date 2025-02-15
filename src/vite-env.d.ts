/// <reference types="vite/client" />

interface InterfaceTodoListProps {
  id: number;
  content: string;
  createdAt: Date;
  isCompleted: boolean;
}

interface InterfaceTaskContainerProps {
  isFetchingTasks: boolean | null;
  todos: InterfaceTodoListProps[];
}

interface InterfaceCreateTaskFormProps {
  setTodos: React.Dispatch<React.SetStateAction<InterfaceTodoListProps[]>>;
}
