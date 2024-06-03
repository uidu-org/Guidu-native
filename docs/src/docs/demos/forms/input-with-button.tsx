"use client";

import { Button } from "@uidu/core-ui";
import { Input } from "@uidu/forms-ui";

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
}
