import { Label } from "@holo/core";
import { CheckboxBase } from "@holo/forms";

export default function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <CheckboxBase id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
}
