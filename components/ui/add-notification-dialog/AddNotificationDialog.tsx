import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import "./styles.css";
import NotificationTypeSelect from "../notification-type-select/NotificationTypeSelect";

type FormFields = {
  type: string;
  name?: string;
  releaseNumber?: number;
};

const AddNotificationDialog = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { register, handleSubmit } = useForm<FormFields>();
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const onChangeCallback = (change: string) => {
    setSelectedValue(change);
  };

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
              {...register("name")}
              type="text"
              className="Input"
              id="name"
            />
          </fieldset>
        );
      case "update":
        return (
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="releasenumber">
              Release number
            </label>
            <input
              {...register("releaseNumber")}
              type="number"
              className="Input"
              id="releasenumber"
            />
          </fieldset>
        );
      default:
        return null;
    }
  };

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
                  {...register("type")}
                  type={selectedValue}
                  onChange={onChangeCallback}
                />
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
