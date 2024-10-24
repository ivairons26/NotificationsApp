"use client";
import { trpc } from "@/server/client";
import { useState } from "react";

export default function Home() {
  const getNotifications = trpc.notification.getNotifications.useQuery();
  const addNotification = trpc.notification.addNotification.useMutation({
    onSettled: () => {
      getNotifications.refetch();
    },
  });

  const [type, setType] = useState<string>("");
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {JSON.stringify(getNotifications.data)}
      <div className="flex flex-col gap-3">
        Type:{" "}
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
          className="border"
        />
        <button onClick={() => addNotification.mutate({ type })}>Add</button>
      </div>
    </main>
  );
}
