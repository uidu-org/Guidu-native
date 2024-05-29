"use client";
import { Button } from "@uidu/core-ui";
import { Textarea } from "@uidu/forms-ui";

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
}
