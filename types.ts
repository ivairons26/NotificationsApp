import { z } from "zod";

export const NotificationTypeSchema = z.enum([
  "update",
  "chat",
  "comment",
  "workspace",
]);

export type NotificationTypeModel = z.infer<typeof NotificationTypeSchema>;

export const NotificationSchema = z.discriminatedUnion(
  "type",
  [
    z.object({
      type: z.literal("update"),
      releaseNumber: z.number({
        errorMap: () => ({
          message: "You should provide a valid release number.",
        }),
      }),
    }),
    z.object({
      type: z.enum(["chat", "comment", "workspace"]),
      userID: z.number({
        errorMap: () => ({ message: "You should select a user." }),
      }),
    }),
  ],
  {
    errorMap: () => ({ message: "You should select a notification type." }),
  }
);

export type NotificationModel = z.infer<typeof NotificationSchema>;
