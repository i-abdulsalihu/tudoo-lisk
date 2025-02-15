import { toast } from "sonner";
import { FiClock } from "react-icons/fi";
import Markdown from "react-markdown";
import { useEffect, useState } from "react";
import { IoTrashBinOutline } from "react-icons/io5";
import { useAnimate, usePresence, motion } from "framer-motion";

import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatRelativeDate } from "@/lib/utils";
import { deleteTaskById, updateStatusById } from "@/services/serviceFn";

type Props = {
  todo: InterfaceTodoListProps;
};

export default function TodoList({
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

  async function updateStatus(taskId: number) {
    setLoadingState({ id: taskId, action: "check" });
    toast.loading(`Updating task "${taskId}" status...`);
    try {
      const result = await updateStatusById(id);
      if (result.status) return;
      toast.error("Failed to update task completion status");
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Unknown Error";
      toast.error(errMsg);
      console.log(errMsg, error);
    } finally {
      toast.dismiss();
      setLoadingState({ id: null, action: null });
    }
  }

  async function deleteTask(taskId: number) {
    setLoadingState({ id: taskId, action: "delete" });
    toast.loading(`Deleting task "${taskId}"...`);
    try {
      const result = await deleteTaskById(id);
      if (result.status) return;
      toast.error("Failed to update task completion status");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown Error";
      toast.error(errMsg);
      console.log(errMsg, error);
    } finally {
      toast.dismiss();
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
            onCheckedChange={() => updateStatus(id)}
            className="size-5 rounded"
          />
        )}
      </span>

      <Markdown
        className={cn(
          "font-sans whitespace-break-spaces tracking-wider text-sm mt-[2px] flex-1 font-normal",
          {
            "italic text-primary line-through": isCompleted,
          }
        )}
      >
        {content}
      </Markdown>

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
          onClick={() => deleteTask(id)}
          variant={isDeleting ? "secondary" : "destructive"}
        >
          <IoTrashBinOutline className="size-5" />
        </Button>
      </div>
    </motion.div>
  );
}
