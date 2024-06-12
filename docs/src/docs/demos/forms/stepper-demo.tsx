import { Step, Stepper } from "@holo/forms";

export default function StepperDemo() {
  return (
    <Stepper>
      <Step title="Step 1" description="this is a description" />
      <Step title="Step 2" description="this is a description" />
      <Step title="Step 3" description="this is a description" />
    </Stepper>
  );
}
