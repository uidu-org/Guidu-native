import { Label } from "@uidu/core-ui";
import { Input } from "@uidu/forms-ui";

export default function InputWithText() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">Email</Label>
      <Input type="email" id="email-2" placeholder="Email" />
      <p className="text-sm text-muted-foreground">Enter your email address.</p>
    </div>
  );
}
