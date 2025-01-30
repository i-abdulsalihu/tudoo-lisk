/// <reference types="vite/client" />

interface InterfaceTodoListProps {
  id: number;
  content: string;
  createdAt: Date;
  isCompleted: boolean;
}

interface InterfaceTaskContainerProps {
  todos: InterfaceTodoListProps[];
  setTodos: React.Dispatch<React.SetStateAction<InterfaceTodoListProps[]>>;
}

interface InterfaceCreateTaskFormProps {
  setTodos: React.Dispatch<React.SetStateAction<InterfaceTodoListProps[]>>;
}
