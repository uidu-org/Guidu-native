"use client";

import {
  Button,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@holo/core";

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
