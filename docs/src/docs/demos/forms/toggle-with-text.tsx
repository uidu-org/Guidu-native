"use client";

import { Italic } from "lucide-react";

import { Toggle } from "@uidu/forms-ui";

export default function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle italic">
      <Italic className="mr-2 h-4 w-4" />
      Italic
    </Toggle>
  );
}
