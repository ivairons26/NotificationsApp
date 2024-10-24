import { router } from "./trpc";
import { notificationRouter } from "./routers/notification";

export const appRouter = router({
  notification: notificationRouter,
});

export type AppRouter = typeof appRouter;
