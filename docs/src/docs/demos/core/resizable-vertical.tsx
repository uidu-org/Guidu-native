"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@holo/core";

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Two</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Three</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
