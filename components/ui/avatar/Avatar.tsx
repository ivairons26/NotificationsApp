import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./styles.css";
import { GearIcon } from "@radix-ui/react-icons";

type Props = {
  id?: number;
  name?: string;
};

const UserAvatar = (props: Props) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image
        className="AvatarImage"
        src={`https://i.pravatar.cc/150?img=${props.id}`}
        alt={props.name}
      />
      {props.name && (
        <>
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            {props.name?.split(" ").reduce((initials, name) => {
              initials += name[0];
              return initials;
            }, "")}
          </Avatar.Fallback>{" "}
        </>
      )}
      {!props.name && (
        <>
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            <GearIcon />
          </Avatar.Fallback>{" "}
        </>
      )}
    </Avatar.Root>
  </div>
);

export default UserAvatar;
