import * as Select from "@radix-ui/react-select";
import "./styles.css";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import React, { useContext, forwardRef } from "react";
import { UserContext } from "@/app/contexts/userContext";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = UseFormRegisterReturn<string> & {
  value: number | undefined;
};

const UserSelect = forwardRef<HTMLButtonElement, Props>(
  ({ value, name, onChange, onBlur }, ref) => {
    const users = useContext(UserContext);

    return (
      <Select.Root
        onValueChange={(val) => onChange({ target: { name, value: +val } })}
        name={name}
        defaultValue={
          typeof value !== "undefined" ? value.toString() : undefined
        }
      >
        <Select.Trigger
          className="SelectTrigger"
          aria-label="user"
          ref={ref}
          onBlur={onBlur}
        >
          <Select.Value placeholder="Select a user" />
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
              {users?.map((user, index) => (
                <Select.Item
                  key={index}
                  className="SelectItem"
                  value={user.id.toString()}
                >
                  <Select.ItemText>{user.name}</Select.ItemText>
                  <Select.ItemIndicator className="SelectItemIndicator">
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

UserSelect.displayName = "UserSelect";

export default UserSelect;
