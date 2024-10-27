import * as Select from "@radix-ui/react-select";
import "./styles.css";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import React, { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { NotificationTypeModel } from "@/types";

type Props = UseFormRegisterReturn<string> & {
  value: NotificationTypeModel | undefined;
};

const NotificationTypeSelect = forwardRef<HTMLButtonElement, Props>(
  ({ value, name, onChange, onBlur }, ref) => {
    return (
      <Select.Root
        onValueChange={(value) => onChange({ target: { name, value } })}
        name={name}
        defaultValue={value}
      >
        <Select.Trigger
          className="SelectTrigger"
          aria-label="type"
          ref={ref}
          onBlur={onBlur}
        >
          <Select.Value placeholder="Select a notification type" />
          <Select.Icon className="SelectIcon">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="SelectContent"
            position="popper"
            sideOffset={5}
          >
            <Select.Viewport className="SelectViewport">
              <Select.Item className="SelectItem" value="update">
                <Select.ItemText>update</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item className="SelectItem" value="chat">
                <Select.ItemText>chat</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item className="SelectItem" value="comment">
                <Select.ItemText>comment</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item className="SelectItem" value="workspace">
                <Select.ItemText>workspace</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

NotificationTypeSelect.displayName = "NotificationTypeSelect";
export default NotificationTypeSelect;
