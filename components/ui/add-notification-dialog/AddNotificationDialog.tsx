import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.css";
import NotificationTypeSelect from "../notification-type-select/NotificationTypeSelect";
import { trpc } from "@/server/client";

export type FormFields = {
  type: string;
  name?: string;
  releaseNumber?: number;
};

const AddNotificationDialog = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // TODO add notification to the DB with all properties
    addNotification.mutate({ type: data.type });
  };

  const onChangeCallback = (change: string) => {
    setSelectedValue(change);
    setValue(type.name, change);
  };

  const addNotification = trpc.notification.addNotification.useMutation({
    onSettled: () => {
      // TODO add notification to the top of the pannel
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
              id="releasenumber"
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

  const type = register("type", { required: "required" });

  return (
    <Dialog.Root>
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
                  value={selectedValue}
                  onChange={onChangeCallback}
                />
                {errors.type && (
                  <div className="text-red-500">{errors.type.message}</div>
                )}
              </fieldset>
              <Item type={selectedValue} />
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                {/* <Dialog.Close asChild> */}
                <button type="submit" className="Button green">
                  Save changes
                </button>
                {/* </Dialog.Close> */}
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
