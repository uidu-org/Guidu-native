import { Mail } from "lucide-react"

import { Button } from "@uidu/core-ui"

export default function ButtonWithIcon() {
  return (
    <Button>
      <Mail className="mr-2 h-4 w-4" /> Login with Email
    </Button>
  )
}
