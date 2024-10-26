"use client";
import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { BellIcon, Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import { trpc } from "@/server/client";
import AddNotificationDialog from "../add-notification-dialog/AddNotificationDialog";
import NotificationUpdate from "../notification-update/NotificationUpdate";

function NotificationPannel() {
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

  const markNotificationAsRead = () => {
    console.log("markNotificationAsRead");
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
          <ul>
            {getNotifications.data?.map((notification) => (
              <li onClick={markNotificationAsRead} key={notification.id}>
                {notification.type === "update" && <NotificationUpdate />}
                {notification.type !== "update" && (
                  <div>{notification.type}</div>
                )}
              </li>
            ))}
          </ul>
          <AddNotificationDialog />
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
