"use client";

import { TextGenerator } from "@/components/ui/animated/text-generator";
import { Button } from "@holo/core";
import { Github, HandHeart } from "lucide-react";
import Link from "next/link";

export default function MainPage() {
  return (
    <div className="grid min-h-dvh place-content-center">
      <div className="w-fit space-y-7 p-2">
        <h1 className="text-3xl font-bold">
          The New UI-kit,
          <TextGenerator
            className="inline-block text-4xl font-bold"
            words={" made with love"}
          />{" "}
          <HandHeart className="inline-block h-9 w-9 animate-pulse text-purple-700" />{" "}
        </h1>

        <div className="mx-auto flex w-56 justify-around">
          <Link href={"/docs/installation"}>
            <Button>Docs example</Button>
          </Link>
          <Link target="_blank" href={"https://github.com/uidu-org/holo"}>
            <Button iconBefore={<Github />}>Git hub</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
