"use client";

import { Button } from "@holo/core";
import Link from "next/link";

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
