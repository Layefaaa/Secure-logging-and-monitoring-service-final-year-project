import { Avatar } from "@mui/material";
import React from "react";
import { Label } from "./Label";

interface UserAvatarProps {
  firstname?: string;
  lastname?: string;
  imgUri?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  firstname = "",
  lastname = "",
  imgUri,
}) => {
  // If an image URI is provided, display it; otherwise, display initials
  const initials =
    firstname && lastname
      ? `${firstname.charAt(0).toUpperCase()}${lastname
          .charAt(0)
          .toUpperCase()}`
      : "";

  return (
    <Avatar src={imgUri} alt={imgUri ? "User Avatar" : "User Initials"}>
      {!imgUri && <Label>{initials}</Label>}
    </Avatar>
  );
};

export default UserAvatar;
