import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.css";
import NotificationTypeSelect from "../notification-type-select/NotificationTypeSelect";
import { trpc } from "@/server/client";
import { NotificationTypeModel } from "@/server/routers/notification";
import UserSelect from "../user-select/UserSelect";

export type FormFields = {
  type: NotificationTypeModel;
  releaseNumber?: number;
  userID?: number;
};

const AddNotificationDialog = () => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormFields>(); // TODO use zod
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const notificationDbModel: {
      type: NotificationTypeModel;
      seen: boolean;
      releaseNumber?: number;
      userID?: number;
    } = {
      type: data.type,
      seen: false,
    };

    if (data.releaseNumber) {
      notificationDbModel.releaseNumber = +data.releaseNumber;
    }

    if (data.userID) {
      notificationDbModel.userID = data.userID;
    }

    addNotification.mutate(notificationDbModel);
  };

  const type = register("type", { required: "required" });

  const onTypeChangeCallback = (change: NotificationTypeModel) => {
    setSelectedType(change);
    setValue(type.name, change, { shouldValidate: true });
  };

  const onUserChangeCallback = (change: string) => {
    setSelectedUser(change);
    setValue("userID", +change, { shouldValidate: true });
  };

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
      case "update":
        return (
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="releasenumber">
              Release number
            </label>
            <input
              {...register("releaseNumber", { required: "required" })}
              type="number"
              className="Input"
              id="releaseNumber"
            />
            {errors.releaseNumber && (
              <div className="text-red-500">{errors.releaseNumber.message}</div>
            )}
          </fieldset>
        );
      case "chat":
      case "comment":
      case "workspace":
        return (
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="userID">
              Name
            </label>
            <UserSelect
              value={selectedUser}
              onUserChange={onUserChangeCallback}
              {...register("userID", { required: "required" })}
            />

            {errors.userID && (
              <div className="text-red-500">{errors.userID.message}</div>
            )}
          </fieldset>
        );
      default:
        return null;
    }
  };

  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedType("");
      setSelectedUser("");
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
                  value={selectedType}
                  onChange={onTypeChangeCallback}
                />
                {errors.type && (
                  <div className="text-red-500">{errors.type.message}</div>
                )}
              </fieldset>
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
