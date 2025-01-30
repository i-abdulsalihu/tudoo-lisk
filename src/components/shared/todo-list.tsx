import { toast } from "sonner";
import { FiClock } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { useAnimate, usePresence, motion } from "framer-motion";

import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatRelativeDate } from "@/lib/utils";

type Props = {
  todo: InterfaceTodoListProps;
  setTodos: React.Dispatch<React.SetStateAction<InterfaceTodoListProps[]>>;
};

export default function TodoList({
  setTodos,
  todo: { content, createdAt, id, isCompleted },
}: Props) {
  const [scope, animate] = useAnimate();
  const [isPresent, safeToRemove] = usePresence();

  const [revalidateTime, setRevalidateTime] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<{
    id: number | null;
    action: "check" | "delete" | null;
  }>({ id: null, action: null });

  useEffect(() => {
    if (!isPresent) {
      const exitAnimation = async () => {
        animate(
          "p",
          {
            color: isCompleted ? "#6ee7b7" : "#fca5a5",
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );
        await animate(
          scope.current,
          {
            scale: 1.025,
          },
          {
            ease: "easeIn",
            duration: 0.125,
          }
        );

        await animate(
          scope.current,
          {
            opacity: 0,
            x: isCompleted ? 24 : -24,
          },
          {
            delay: 0.75,
          }
        );
        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevalidateTime(formatRelativeDate(createdAt));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function handleCheck(taskId: number) {
    try {
      setLoadingState({ id: taskId, action: "check" });
      toast.loading(`Updating task "${taskId}" status...`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTodos((pv) =>
        pv.map((todo) =>
          todo.id === taskId
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        )
      );

      toast.success(`Task "${taskId}" updated successfully`);
      toast.dismiss();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState({ id: null, action: null });
    }
  }

  async function removeElement(taskId: number) {
    try {
      setLoadingState({ id: taskId, action: "delete" });
      toast.loading(`Deleting task "${taskId}"...`);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTodos((pv) => pv.filter((todo) => todo.id !== taskId));

      toast.success(`Task "${taskId}" deleted successfully`);
      toast.dismiss();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingState({ id: null, action: null });
    }
  }

  const isDeleting = loadingState.id === id && loadingState.action === "delete";
  const isChecking = loadingState.id === id && loadingState.action === "check";

  return (
    <motion.div
      ref={scope}
      layout
      className={cn(
        "relative flex w-full items-start gap-3 rounded-lg border border-zinc-900 bg-secondary p-4 transition-opacity",
        {
          "pointer-events-none select-none cursor-not-allowed opacity-50":
            isChecking || isDeleting,
        }
      )}
    >
      <span className="size-6 flex items-center justify-center">
        {isChecking ? (
          <Loader className="animate-spin size-5 text-muted-foreground" />
        ) : (
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => handleCheck(id)}
            className="size-5 rounded"
          />
        )}
      </span>

      <ReactMarkdown
        className={cn(
          "font-sans whitespace-break-spaces tracking-wider text-sm mt-[2px] flex-1 font-normal",
          {
            "italic text-primary line-through": isCompleted,
          }
        )}
      >
        {content}
      </ReactMarkdown>

      <div className="h-6 flex items-center gap-2 ml-auto">
        <p className="flex items-center gap-1 whitespace-nowrap rounded bg-zinc-800 px-2 h-full text-muted-foreground">
          <FiClock className="text-sm" />
          <span className="text-xs font-medium tracking-wide">
            {revalidateTime}
          </span>
        </p>
        <Button
          size={"icon"}
          isLoading={isDeleting}
          className="size-6 rounded"
          onClick={() => removeElement(id)}
          variant={isDeleting ? "secondary" : "destructive"}
        >
          <IoTrashBinOutline className="size-5" />
        </Button>
      </div>
    </motion.div>
  );
}
