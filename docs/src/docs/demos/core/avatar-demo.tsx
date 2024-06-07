"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@holo/avatar";

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://avatars.githubusercontent.com/u/124514869?v=4"
        alt="random photo"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
