import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./styles.css";
import { GearIcon } from "@radix-ui/react-icons";
import { User } from "@/app/contexts/userContext";

type Props = {
  user?: User;
};

const UserAvatar = (props: Props) => (
  <div style={{ display: "flex", gap: 20 }}>
    <Avatar.Root className="AvatarRoot mr-2.5">
      <Avatar.Image
        className="AvatarImage"
        src={props.user?.avatar}
        alt={props.user?.name}
      />
      {props.user?.name && (
        <>
          <Avatar.Fallback className="AvatarFallback" delayMs={600}>
            {props.user.name.split(" ").reduce((initials, name) => {
              initials += name[0];
              return initials;
            }, "")}
          </Avatar.Fallback>{" "}
        </>
      )}
      {!props.user?.name && (
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
