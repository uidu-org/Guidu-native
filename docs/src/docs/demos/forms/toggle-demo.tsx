"use client";

import { Bold } from "lucide-react";

import { Toggle } from "@holo/forms";

export default function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
