import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { NotificationSchema } from "@/types";

const prisma = new PrismaClient();

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

export const getNotifications = procedure.query(async () => {
  return await prisma.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

const addNotification = procedure
  .input(NotificationSchema)
  .mutation(async (opts) => {
    const { input } = opts;
    await prisma.notification.create({
      data: {
        type: input.type,
        seen: false,
        releaseNumber: "releaseNumber" in input ? input.releaseNumber : null,
        userID: "userID" in input ? input.userID : null,
      },
    });
  });

export const notificationRouter = router({
  getNotifications,
  patchNotification,
  addNotification,
});
