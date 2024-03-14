import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@uidu/core-ui"

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
