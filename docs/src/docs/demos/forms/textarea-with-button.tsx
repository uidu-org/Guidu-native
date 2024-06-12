"use client";
import { Button } from "@holo/core";
import { Textarea } from "@holo/forms";

export default function TextareaWithButton() {
  return (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
}
