import { CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Step } from "@/types/application";

interface ApplicationStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ApplicationStepper({
  steps,
  currentStep,
}: ApplicationStepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  index < currentStep
                    ? "bg-primary border-primary text-primary-foreground"
                    : index === currentStep
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors",
                    index < currentStep ? "bg-primary" : "bg-muted-foreground"
                  )}
                />
              )}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium">{step.title}</p>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
