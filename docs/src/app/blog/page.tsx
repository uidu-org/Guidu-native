"use client";

import BreadcrumbDemo from "@/docs/demos/core/breadcrumb-demo";
import ToastDemo from "@/docs/demos/core/toast-demo";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  AvatarItem,
  Badge,
  Button,
  Presence,
  Status,
} from "@uidu/core-ui";
import Link from "next/link";

function customAvatar(item) {
  console.log("item", item);
  return (
    <p>Pippo {item.id}</p>
    // <Avatar
    //   key={src}
    //   // typeIconAction="remove"
    //   // onClickAction={() => onClickActions(item?.id)}
    //   src={src}
    //   shape={shape}
    // />
  );
}

export default function Page() {
  const item = [
    {
      id: "1a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
      alt: "random photo",
      name: "prova Avatar group ",
    },
    {
      id: "2a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
      alt: "random photo",
      name: "prova Avatar group ",
    },
    {
      id: "3a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
      alt: "random photo",
      name: "prova Avatar group ",
    },
    {
      id: "4a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
      alt: "random photo",
      name: "prova Avatar group ",
    },
    {
      id: "5a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
      alt: "random photo",
      name: "prova Avatar group ",
    },
  ];

  return (
    <div className="grid h-screen place-content-center">
      <p>Page Blog</p>
      <Link className="underline" href={"/"}>
        Go Back
      </Link>
      <BreadcrumbDemo />
      <ToastDemo />
      <div className="w-20 h-auto m-5 ">
        <Button className="text-black">icona</Button>
        <Button variant={"danger"} className="text-black">
          danger
        </Button>
        <Button className="text-black">icona</Button>
      </div>

      <div className="w-1/2 bg-slate-500">
        {/* <AvatarGroup variant={"stack"} maxCount={4}>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
              shape={"square"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar shape={"square"}>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </AvatarGroup>
        <AvatarGroup variant={"grid"}>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
              shape={"square"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar shape={"square"}>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://avatars.githubusercontent.com/u/124514869?v=4"
              alt="random photo"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </AvatarGroup> */}
        <AvatarGroup items={item} maxCount={3} />
        <AvatarGroup items={item} maxCount={3} customAvatar={customAvatar} />
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
            <Presence
              presence={
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
              }
            />
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
            <Presence presence={"busy"} corner={"topRight"} />
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
            <Presence presence={"offline"} corner={"bottomRight"} />
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
            <Status status={"locked"} corner={"topRight"} />
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
            <Presence presence={"online"} />
          </Avatar>
        </AvatarItem>
        <AvatarItem
          primaryText={" Prova Avatar con Props"}
          secondaryText={"Prova avatar items"}
        >
          <Avatar
            shape="square"
            src="https://avatars.githubusercontent.com/u/124514869?v=4"
            alt="random photo"
            status={"declined"}
            showStatus={true}
            statusCorner="topRight"
            statusSize="sm"
          />
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
