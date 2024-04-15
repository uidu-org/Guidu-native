"use client"

import Link from "next/link"

import { Button } from "@uidu/core-ui"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
