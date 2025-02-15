import { z } from "zod";

export const MAX_CONTENT_VALUE = 700;

export const newTaskSchema = z.object({
  content: z
    .string()
    .min(2, {
      message: "Task content must be at least 2 characters",
    })
    .max(MAX_CONTENT_VALUE, {
      message: `Task content must be at most ${MAX_CONTENT_VALUE} characters`,
    }),
});

export interface InterfaceNeTaskSchema extends z.infer<typeof newTaskSchema> {}
