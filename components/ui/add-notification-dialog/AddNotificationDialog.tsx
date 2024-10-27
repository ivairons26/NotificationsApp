import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.css";
import NotificationTypeSelect from "../notification-type-select/NotificationTypeSelect";
import { trpc } from "@/server/client";
import UserSelect from "../user-select/UserSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NotificationModel,
  NotificationSchema,
  NotificationTypeModel,
} from "@/types";

export type FormFields = {
  type: NotificationTypeModel;
  releaseNumber?: number;
  userID?: number;
};

const AddNotificationDialog = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    resetField,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(NotificationSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    let notification: NotificationModel;
    if (data.type === "update") {
      notification = {
        type: "update",
        releaseNumber: data.releaseNumber as number,
      };
    } else {
      notification = { type: data.type, userID: data.userID as number };
    }
    addNotification.mutate(notification);
  };

  const selectedType = watch("type");
  const selectedUser = watch("userID");

  const addNotification = trpc.notification.addNotification.useMutation({
    onSuccess: () => {
      onOpenChange(false);
    },
    onError: (err) => {
      console.error(err);
      setError("root", {
        message: "Something happened. Notification wasn't saved.",
      });
    },
  });

  const Item = ({ type }: { type: string }) => {
    switch (type) {
      case "chat":
      case "comment":
      case "workspace":
        return (
          <>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="userID">
                User
              </label>
              <UserSelect {...register("userID")} value={selectedUser} />
            </fieldset>
            {errors.userID && (
              <div className="text-red-500">{errors.userID.message}</div>
            )}
          </>
        );
      case "update":
        return (
          <>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="releaseNumber">
                Release number
              </label>
              <input
                {...register("releaseNumber", { valueAsNumber: true })}
                type="number"
                className="Input"
                id="releaseNumber"
              />
            </fieldset>
            {errors.releaseNumber && (
              <div className="text-red-500">{errors.releaseNumber.message}</div>
            )}
          </>
        );
      default:
        return null;
    }
  };

  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button className="Button violet">Add</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">
              Add notification
            </Dialog.Title>
            <Dialog.Description className="DialogDescription">
              What kind of notification do you want to add?
            </Dialog.Description>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="type">
                  Type
                </label>
                <NotificationTypeSelect
                  {...register("type", {
                    onChange: () => {
                      resetField("releaseNumber");
                      resetField("userID");
                    },
                  })}
                  value={selectedType}
                />
              </fieldset>
              {errors.type && (
                <div className="text-red-500">{errors.type.message}</div>
              )}
              <Item type={selectedType} />
              {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
              )}
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <button
                  disabled={addNotification.isPending}
                  type="submit"
                  className="Button green"
                >
                  {addNotification.isPending ? "Loading" : "Save changes"}
                </button>
              </div>
            </form>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddNotificationDialog;
