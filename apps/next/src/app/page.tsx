"use client"

import { TextGenerator } from "@/components/ui/animated/text-generator"
import { Button } from "@uidu/button-ui"
import { Github, HandHeart } from "lucide-react"
import Link from "next/link"


export default function MainPage() {

  return (
    <div className="min-h-dvh grid place-content-center">
      <div className="w-fit space-y-7 p-2">

        <h1 className="font-bold text-3xl">The New UI-kit,<TextGenerator className="inline-block font-bold text-4xl" words={" made with love"} /> <HandHeart className="inline-block w-9 h-9 text-purple-700 animate-pulse" /> </h1>

        <div className="w-56 mx-auto flex justify-around">
          <Link href={"/docs"} >
            <Button>Docs</Button>
          </Link>
          <Link target="_blank" href={"https://github.com/uidu-org/Guidu-native"}>
            <Button iconBefore={<Github />} >Git hub</Button>
          </Link>
        </div>

      </div>
    </div>
  )
}
