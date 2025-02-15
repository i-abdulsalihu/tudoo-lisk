import { IoTrashBinOutline } from "react-icons/io5";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { deleteAllTasks } from "@/services/serviceFn";

export default function ClearAllTasks() {
  const [openModal, setOpenModal] = useState(false);

  const [isClearing, setIsClearing] = useState(false);

  async function handleClearTasks() {
    setIsClearing(true);
    toast.loading("Deleting all tasks...");
    try {
      const result = await deleteAllTasks();
      if (result.status) return;
      toast.error("Failed to clear tasks");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "Unknown Error";
      toast.error(errMsg);
      console.log(errMsg, error);
    } finally {
      toast.dismiss();
      setIsClearing(false);
    }
  }

  return (
    <AlertDialog open={openModal} onOpenChange={() => setOpenModal(!openModal)}>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"} size={"sm"}>
          <span>Delete every tasks</span>
          <IoTrashBinOutline className="size-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-5">
            Are you certain you want to delete every task?
          </AlertDialogTitle>
          <AlertDialogDescription className="py-5 border-y border-zinc-900 flex items-center gap-4 !font-normal tracking-wide">
            <span className="bg-red-500/10 rounded-full size-14 flex items-center justify-center">
              <IoTrashBinOutline className="size-6 text-destructive" />
            </span>
            <span className="flex-1">
              Deleting all tasks will remove them from the list. This action
              can't be undone.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button
            disabled={isClearing}
            onClick={() => setOpenModal(false)}
            variant={"secondary"}
          >
            Cancel
          </Button>

          <Button
            variant={"destructive"}
            onClick={handleClearTasks}
            disabled={isClearing}
            isLoading={isClearing}
            loadingText="Please wait..."
          >
            Proceed
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
