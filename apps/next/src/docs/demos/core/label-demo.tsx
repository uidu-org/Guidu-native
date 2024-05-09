import { Label } from "@uidu/core-ui"
import { CheckboxBase } from "@uidu/forms-ui"


export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <CheckboxBase id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}