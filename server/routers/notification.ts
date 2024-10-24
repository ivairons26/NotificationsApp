import { z } from "zod";
import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const notificationRouter = router({
  getNotifications: procedure.query(async () => {
    return await prisma.notification.findMany();
  }),
  addNotification: procedure
    .input(z.object({ type: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.notification.create({
        data: {
          type: input.type,
        },
      });
    }),
});
