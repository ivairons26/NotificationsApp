import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.css";
import NotificationTypeSelect from "../notification-type-select/NotificationTypeSelect";
import { trpc } from "@/server/client";
import { NotificationTypeModel } from "@/server/routers/notification";

export type FormFields = {
  type: NotificationTypeModel;
  name?: string;
  releaseNumber?: number;
};

const AddNotificationDialog = () => {
  const [selectedType, setSelectedType] = useState<string>(""); // TODO check if we can omit this and use react hook form

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormFields>(); // TODO use zod
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // TODO add notification to the DB with all properties
    const notificationDbModel: {
      type: NotificationTypeModel;
      seen: boolean;
      releaseNumber?: number;
    } = {
      type: data.type,
      seen: false,
    };

    if (data.releaseNumber) {
      notificationDbModel.releaseNumber = +data.releaseNumber;
    }

    addNotification.mutate(notificationDbModel);
  };

  const type = register("type", { required: "required" });

  const onTypeChangeCallback = (change: NotificationTypeModel) => {
    setSelectedType(change);
    setValue(type.name, change, { shouldValidate: true });
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
      case "chat":
      case "comment":
      case "workspace":
        return (
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input
              {...register("name", { required: "required" })}
              type="text"
              className="Input"
              id="name"
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </fieldset>
        );
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
      default:
        return null;
    }
  };

  const [open, setOpen] = useState(false);

  const onOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedType("");
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
