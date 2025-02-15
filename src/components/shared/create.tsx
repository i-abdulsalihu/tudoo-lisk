import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiPlus } from "react-icons/hi";
import { LuLetterText } from "react-icons/lu";
import { toast } from "sonner";

import {
  newTaskSchema,
  MAX_CONTENT_VALUE,
  InterfaceNeTaskSchema,
} from "@/lib/validatore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAccount } from "wagmi";
import { createTask } from "@/services/serviceFn";

export default function CreateTaskForm() {
  const { isConnected } = useAccount();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const form = useForm<InterfaceNeTaskSchema>({
    resolver: zodResolver(newTaskSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: InterfaceNeTaskSchema) {
    toast.loading("Creating task...");
    try {
      const result = await createTask(values.content, String(new Date()));
      if (!result.status) return;
      form.reset();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Unknown Error";
      toast.error(errMsg);
      console.log(errMsg, error);
    } finally {
      toast.dismiss();
    }
  }

  const {
    watch,
    getValues,
    formState: { isValid, isSubmitting, errors },
  } = form;

  useEffect(() => {
    return () => {
      if (getValues("content").length !== 0) {
        setIsVisible(true);
      }
    };
  }, [watch("content")]);

  const isContentError =
    getValues("content").length >= MAX_CONTENT_VALUE + 1 || !!errors.content;

  return (
    <div className="mx-auto max-w-xl w-full flex flex-col gap-6 absolute bottom-4 left-1/2 -translate-x-1/2">
      <AnimatePresence>
        {isVisible && (
          <Form {...form}>
            <motion.form
              initial={{ opacity: 0, y: 25, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.8 }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full rounded-lg border-zinc-900 border bg-secondary p-4 origin-bottom shadow-[black_0px_30px_90px]"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        error={isContentError}
                        autoFocus
                        disabled={isSubmitting}
                        placeholder="What do you need to do?"
                        className="h-24 w-full resize-none px-4 py-3 text-sm tracking-wider border-zinc-900 border"
                      />
                    </FormControl>

                    <FormMessage />

                    <div className="flex items-center justify-between mt-2">
                      <p
                        className={cn(
                          "text-sm tracking-wider text-muted-foreground flex items-center gap-2",
                          {
                            "text-destructive": isContentError,
                          }
                        )}
                      >
                        <LuLetterText className="size-5" />
                        <span>
                          {field.value.length}/{MAX_CONTENT_VALUE}
                        </span>
                      </p>

                      <Button
                        type="submit"
                        variant={
                          isSubmitting
                            ? "secondary"
                            : isContentError
                            ? "destructive"
                            : "default"
                        }
                        disabled={!isValid || isSubmitting || isContentError}
                        isLoading={isSubmitting}
                        loadingText="Please wait..."
                        className="h-7 text-xs font-medium rounded-[6px] px-3 gap-2"
                      >
                        <span>Submit</span>
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </motion.form>
          </Form>
        )}
      </AnimatePresence>

      <Button
        size={"lg"}
        variant={"secondary"}
        className="rounded-full w-[80%] mx-auto border-zinc-900 border"
        disabled={!isConnected}
        onClick={() => setIsVisible((pv) => !pv)}
      >
        {isConnected ? (
          <HiPlus
            className={`transition-transform !size-5 ${
              isVisible ? "rotate-45" : "rotate-0"
            }`}
          />
        ) : (
          "Connect wallet to continue"
        )}
      </Button>
    </div>
  );
}
