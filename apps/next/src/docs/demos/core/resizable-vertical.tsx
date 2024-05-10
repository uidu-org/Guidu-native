"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@uidu/core-ui"

export default function ResizableDemo() {
  return (
<ResizablePanelGroup direction="vertical" className="max-w-md rounded-lg border">
<ResizablePanel defaultSize={25}>
  <div className="flex items-center justify-center h-full p-6">
    <span className="font-semibold">Two</span>
  </div>
</ResizablePanel>
<ResizableHandle />
<ResizablePanel defaultSize={75}>
  <div className="flex items-center justify-center h-full p-6">
    <span className="font-semibold">Three</span>
  </div>
</ResizablePanel>
</ResizablePanelGroup>
  )
}

