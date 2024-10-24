"use client";
import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { BellIcon, Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import { trpc } from "@/server/client";
import AddNotificationDialog from "../add-notification-dialog/AddNotificationDialog";

function NotificationPannel() {
  const getNotifications = trpc.notification.getNotifications.useQuery();

  return (
    <Popover.Root>
      <Popover.Trigger>
        <BellIcon />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          <div>Notifications</div>
          <ul>
            {getNotifications.data?.map((notification) => (
              <li key={notification.id}>{notification.type}</li>
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
