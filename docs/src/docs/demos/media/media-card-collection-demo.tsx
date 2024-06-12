"use client";

import { MediaCardCollection } from "@holo/core";

export default function MediaCardCollectionDemo() {
  const files = [
    {
      id: "1a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
    },
    {
      id: "2a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
    },
    {
      id: "3a",
      img: "https://avatars.githubusercontent.com/u/124514869?v=4",
    },
  ];

  const actionExample = (id: string) => {
    console.log(`example for onClickAction: ${id}`);
  };

  return <MediaCardCollection files={files} onClickAction={actionExample} />;
}
