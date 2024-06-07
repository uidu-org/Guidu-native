"use client";

import BreadcrumbDemo from "@/docs/demos/core/breadcrumb-demo";
import ToastDemo from "@/docs/demos/core/toast-demo";
import { Avatar, AvatarGroup, AvatarItem, Badge, Button } from "@holo/core";
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
      img: "https://avatars.githubusercontent.com/u/124514869?v=",
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
      <div className="m-5 h-auto w-20 ">
        <Button className="text-black">icona</Button>
        <Button variant={"danger"} className="text-black">
          danger
        </Button>
        <Button className="text-black">icona</Button>
      </div>

      <div className="w-1/2 bg-slate-500">
        <AvatarGroup items={item} maxCount={3} />
        <AvatarGroup items={item} maxCount={3} customAvatar={customAvatar} />
        <AvatarItem
          primaryText={" Prova Avatar"}
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
