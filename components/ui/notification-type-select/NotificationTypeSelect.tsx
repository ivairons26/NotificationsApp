import * as Select from "@radix-ui/react-select";
import "./styles.css";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export const NotificationTypeSelect = () => (
  <Select.Root>
    <Select.Trigger className="SelectTrigger" aria-label="type">
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
            update
          </Select.Item>
          <Select.Item className="SelectItem" value="chat">
            chat
          </Select.Item>
          <Select.Item className="SelectItem" value="comment">
            comment
          </Select.Item>
          <Select.Item className="SelectItem" value="workspace">
            workspace
          </Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default NotificationTypeSelect;
