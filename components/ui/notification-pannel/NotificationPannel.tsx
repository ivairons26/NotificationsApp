"use client";
import React, { useContext } from "react";
import * as Popover from "@radix-ui/react-popover";
import { BellIcon, Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import { trpc } from "@/server/client";
import AddNotificationDialog from "../add-notification-dialog/AddNotificationDialog";
import NotificationUpdate from "../notification-update/NotificationUpdate";
import UserAvatar from "../user-avatar/UserAvatar";
import { UserContext } from "@/app/contexts/userlContext";

function NotificationPannel() {
  const users = useContext(UserContext);

  const getNotifications = trpc.notification.getNotifications.useQuery();
  const unreadNotifications = getNotifications.data?.reduce(
    (count, notification) => {
      if (notification.seen === false) {
        count++;
      }

      return count;
    },
    0
  );

  const notification = trpc.notification.patchNotification.useMutation({
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
      <Popover.Trigger>
        <BellIcon />
        {unreadNotifications && (
          <div className="flex items-center justify-center rounded-lg w-2.5 h-2.5 bg-red-500"></div>
        )}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div>Notifications</div>
          <AddNotificationDialog />
          <ul>
            {getNotifications.data?.map((notification) => (
              <li
                onClick={() => {
                  if (!notification.seen)
                    markNotificationAsRead(notification.id);
                }}
                key={notification.id}
              >
                <UserAvatar
                  user={
                    users?.[notification.userID ? notification.userID - 1 : -1]
                  }
                />
                {notification.type === "update" && <NotificationUpdate />}
                {notification.type !== "update" && (
                  <div>{notification.type}</div>
                )}
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

export default NotificationPannel;
