"use client";

import { Italic } from "lucide-react";

import { Toggle } from "@uidu/forms-ui";

export default function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  );
}
