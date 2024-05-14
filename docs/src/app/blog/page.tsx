import BreadcrumbDemo from "@/docs/demos/core/breadcrumb-demo";
import ToastDemo from "@/docs/demos/core/toast-demo";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarItem,
  Badge,
  Button,
  Presence,
  PresenceWrapper,
} from "@uidu/core-ui";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid h-screen place-content-center">
      <p>Page Blog</p>
      <Link className="underline" href={"/"}>
        Go Back
      </Link>
      <BreadcrumbDemo />
      <ToastDemo />
      <div className="m-5 h-auto w-20 ">
        <Button className="text-black">icona</Button>
        <Button variant={"danger"} className="text-black">
          danger
        </Button>
        <Button className="text-black">icona</Button>
      </div>

      <div className="w-1/2">
        <AvatarItem
          primaryText={" Prova Avatar"}
          secondaryText={"Prova avatar items"}
        >
          <Avatar shape={"square"}>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
            <PresenceWrapper>
              <Presence presence={"focus"} />
            </PresenceWrapper>
          </Avatar>
        </AvatarItem>
        <AvatarItem
          primaryText={" Prova Avatar"}
          secondaryText={"Prova avatar items"}
        >
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
            <PresenceWrapper corner={"topRight"}>
              <Presence presence={"busy"} />
            </PresenceWrapper>
          </Avatar>
        </AvatarItem>
        <AvatarItem
          primaryText={" Prova Avatar"}
          secondaryText={"Prova avatar items"}
        >
          <Avatar shape={"square"}>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
            <PresenceWrapper corner={"bottomRight"}>
              <Presence presence={"offline"} />
            </PresenceWrapper>
          </Avatar>
        </AvatarItem>
        <AvatarItem
          primaryText={" Prova Avatar"}
          secondaryText={"Prova avatar items"}
        >
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
            <PresenceWrapper corner={"bottomLeft"}>
              <Presence presence={"online"} />
            </PresenceWrapper>
          </Avatar>
        </AvatarItem>
      </div>

      <div className="flex flex-col justify-start">
        <div>
          {" "}
          <span>Default</span>
          <Badge variant={"default"} max={10} testId={"prova"}>
            {6}
          </Badge>
        </div>
        <div>
          <span>Added</span>
          <Badge variant={"added"} max={30}>
            {23}
          </Badge>
        </div>
        <div>
          <span>Important</span>
          <Badge variant={"important"} max={50}>
            {55}
          </Badge>
        </div>
        <div>
          <span>Primary</span>
          <Badge variant={"primary"} max={70}>
            {2}
          </Badge>
        </div>
        <div>
          <span>PrimaryInverted</span>
          <Badge variant={"primaryInverted"} max={99}>
            {100}
          </Badge>
        </div>
        <div>
          <span>Removed</span>
          <Badge variant={"removed"} max={100}>
            {10000}
          </Badge>
        </div>
      </div>
    </div>
  );
}
