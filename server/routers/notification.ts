import { boolean, z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const notificationTypeSchema = z.union([
  z.literal("update"),
  z.literal("chat"),
  z.literal("comment"),
  z.literal("workspace"),
]);

const notificationSchema = z.object({
  type: notificationTypeSchema,
  seen: z.boolean(),
  releaseNumber: z.number().optional(),
  userID: z.number().optional(),
});

const patchNotificationSchema = z.object({
  id: z.number(),
  seen: z.boolean().optional(),
});

const patchNotification = procedure
  .input(patchNotificationSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    await prisma.notification.update({
      data: {
        seen: input.seen,
      },
      where: {
        id: input.id,
      },
    });
  });

const getNotifications = procedure.query(async () => {
  return await prisma.notification.findMany();
});

const addNotification = procedure
  .input(notificationSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    await prisma.notification.create({
      data: {
        type: input.type,
        seen: input.seen,
        releaseNumber: input.releaseNumber,
        userID: input.userID,
      },
    });
  });

export type NotificationTypeModel = z.infer<typeof notificationTypeSchema>;

export const notificationRouter = router({
  getNotifications,
  patchNotification,
  addNotification,
});
