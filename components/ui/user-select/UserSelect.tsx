import * as Select from "@radix-ui/react-select";
import "./styles.css";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import React, { useContext } from "react";
import { UserContext } from "@/app/contexts/userContext";
import { RefCallBack } from "react-hook-form";

type Props = {
  name: string;
  value: string;
  onUserChange: (change: string) => void;
  ref: RefCallBack;
};

export const UserSelect = ({ name, ref, value, onUserChange }: Props) => {
  const users = useContext(UserContext);
  const userChange = (value: string) => {
    onUserChange(value);
  };

  return (
    <Select.Root value={value} onValueChange={userChange} name={name}>
      <Select.Trigger className="SelectTrigger" aria-label="type" ref={ref}>
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
};

export default UserSelect;
