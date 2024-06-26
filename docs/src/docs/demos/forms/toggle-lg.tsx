"use client";

import { Italic } from "lucide-react";

import { Toggle } from "@holo/forms";

export default function ToggleLg() {
  return (
    <Toggle size="lg" aria-label="Toggle italic">
      <Italic className="h-4 w-4" />
    </Toggle>
  );
}
