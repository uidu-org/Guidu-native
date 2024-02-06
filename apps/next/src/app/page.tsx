'use client'

import { TextGenerator } from '@/components/ui/animated/text-generator'
import { Button } from '@uidu/button-ui'
import { Github, HandHeart } from 'lucide-react'
import Link from 'next/link'

export default function MainPage() {
  return (
    <div className="grid min-h-dvh place-content-center">
      <div className="p-2 w-fit space-y-7">
        <h1 className="text-3xl font-bold">
          The New UI-kit,
          <TextGenerator
            className="inline-block text-4xl font-bold"
            words={' made with love'}
          />{' '}
          <HandHeart className="inline-block text-purple-700 w-9 h-9 animate-pulse" />{' '}
        </h1>

        <div className="flex justify-around w-56 mx-auto">
          <Link href={'/docs'}>
            <Button>Docs</Button>
          </Link>
          <Link target="_blank" href={'https://github.com/uidu-org/Guidu-native'}>
            <Button iconBefore={<Github />}>Git hub</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
