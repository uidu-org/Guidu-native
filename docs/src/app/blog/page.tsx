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
  Status,
  StatusWrapper,
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

      <div className="w-1/2 bg-slate-500">
        <AvatarItem
          primaryText={" Prova Avatar"}
          secondaryText={"Prova avatar items"}
        >
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
              shape={"square"}
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
            <StatusWrapper corner={"topRight"}>
              <Status status={"locked"} />
            </StatusWrapper>
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
              <Presence presence={"online"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-bell-plus"
                >
                  <path d="M19.3 14.8C20.1 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 1 0 1.9.2 2.8.7" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                  <path d="M15 8h6" />
                  <path d="M18 5v6" />
                </svg>
              </Presence>
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
