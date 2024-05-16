"use client";

import { Button } from "@uidu/core-ui";
import Link from "next/link";

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
