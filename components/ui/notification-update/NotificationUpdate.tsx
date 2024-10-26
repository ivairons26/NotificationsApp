import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./styles.css";

const NotificationUpdate = () => (
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild>
      <div>Update</div>
    </AlertDialog.Trigger>
    <AlertDialog.Portal>
      <AlertDialog.Overlay className="AlertDialogOverlay" />
      <AlertDialog.Content className="AlertDialogContent">
        <AlertDialog.Title className="AlertDialogTitle">
          New features
        </AlertDialog.Title>
        <AlertDialog.Description className="AlertDialogDescription">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
          condimentum arcu. Nunc fringilla sollicitudin nisi, posuere placerat
          odio hendrerit sed. Integer scelerisque, mauris in rhoncus vulputate,
          dui nisi commodo risus, a efficitur mauris leo vitae ipsum.
          Pellentesque ut arcu turpis.
        </AlertDialog.Description>
        <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
          <AlertDialog.Cancel asChild>
            <button className="Button mauve">Cancel</button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export default NotificationUpdate;
