"use client";
import React, { useContext } from "react";
import * as Popover from "@radix-ui/react-popover";
import { BellIcon, Cross2Icon, ReloadIcon } from "@radix-ui/react-icons";
import "./styles.css";
import { trpc } from "@/server/client";
import AddNotificationDialog from "../add-notification-dialog/AddNotificationDialog";
import NotificationUpdate from "../notification-update/NotificationUpdate";
import UserAvatar from "../user-avatar/UserAvatar";
import { UserContext } from "@/app/contexts/userContext";
import Link from "next/link";

const colorCoding: { [key: string]: string } = {
  update: "bg-red-500",
  chat: "bg-blue-500",
  comment: "bg-green-500",
  workspace: "bg-yellow-500",
  unread: "bg-blue-100",
  read: "bg-white",
};

function NotificationPannel() {
  const users = useContext(UserContext);

  const { data, refetch, isError, error } =
    trpc.notification.getNotifications.useQuery();

  if (isError) {
    console.error(error);
  }

  const unreadNotifications =
    data?.reduce((count, notification) => {
      if (notification.seen === false) {
        count++;
      }

      return count;
    }, 0) || 0;

  const notification = trpc.notification.patchNotification.useMutation({
    onSettled: () => refetch(),
    onError: (err) => {
      console.error(err);
    },
  });

  const markNotificationAsRead = (notificationId: number) => {
    notification.mutate({
      id: notificationId,
      seen: true,
    });
  };

  return (
    <Popover.Root>
      <Popover.Trigger className="flex absolute right-52 top-14 bg-white p-2 rounded-2xl shadow-md">
        <BellIcon />
        {unreadNotifications > 0 && (
          <div className="flex items-center justify-center rounded-lg py-0.3 px-1.5 bg-red-500 text-white text-xs">
            <span>{unreadNotifications}</span>
          </div>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div className="flex items-center p-4 justify-start">
            <div className="mr-2.5 p-0.5 font-semibold">Notifications</div>
            <AddNotificationDialog />
            <button
              onClick={() => refetch()}
              className="cursor-pointer p-2.5 ml-1 rounded hover:bg-neutral-100 focus:outline-none focus:ring focus:ring-violet-600"
              aria-label="Reload"
            >
              <ReloadIcon />
            </button>
          </div>
          <ul>
            {data?.map((notification) => (
              <li
                onClick={() => {
                  if (!notification.seen)
                    markNotificationAsRead(notification.id);
                }}
                key={notification.id}
              >
                <div
                  className={
                    "flex items-center p-2.5 border-b border-violet-700 " +
                    colorCoding[notification.seen ? "read" : "unread"]
                  }
                >
                  <span
                    className={
                      "rounded-full w-2.5 h-2.5 mr-1 " +
                      colorCoding[notification.type]
                    }
                  ></span>

                  <UserAvatar
                    user={
                      users?.[
                        notification.userID ? notification.userID - 1 : -1
                      ]
                    }
                  />
                  <NotificationContent
                    type={notification.type}
                    userName={
                      users?.[
                        notification.userID ? notification.userID - 1 : -1
                      ]?.name
                    }
                  ></NotificationContent>
                </div>
              </li>
            ))}
          </ul>
          <Popover.Close className="PopoverClose" aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

const NotificationContent = ({
  type,
  userName,
}: {
  type: string;
  userName: string | undefined;
}) => {
  switch (type) {
    case "update":
      return <NotificationUpdate />;
    case "comment":
      return (
        <Link href="/comments">
          <span>{userName} tagged you in a comment</span>
        </Link>
      );
    case "chat":
      return (
        <Link href="/chats">
          <span>{userName} shared a chat with you</span>
        </Link>
      );
    case "workspace":
      return (
        <Link href="/workspace">
          <span>{userName} joined your workspace</span>
        </Link>
      );
  }
};

export default NotificationPannel;
