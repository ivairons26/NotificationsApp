import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./styles.css";
import NotificationTypeSelect from "../notification-type-select/NotificationTypeSelect";

const AddNotificationDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet">Add</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay">
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Add notification</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            What kind of notification do you want to add?
          </Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="type">
              Type
            </label>
            <NotificationTypeSelect />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Name
            </label>
            <input className="Input" id="name" />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="releasenumber">
              Release number
            </label>
            <input className="Input" id="releasenumber" />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
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

export default AddNotificationDialog;
