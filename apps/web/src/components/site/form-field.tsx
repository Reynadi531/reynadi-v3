import { Input } from "@reynad-v3/ui/components/input";
import { Label } from "@reynad-v3/ui/components/label";
import { Textarea } from "@reynad-v3/ui/components/textarea";
import { cn } from "@reynad-v3/ui/lib/utils";
import { useId, type ComponentProps } from "react";

import { Reveal } from "@/components/motion/reveal";

const controlClassName =
  "rounded-lg border-line-subtle bg-canvas px-[15px] text-[14px] text-white transition-[border-color,box-shadow] duration-300 placeholder:text-fg-faint hover:border-line-strong focus-visible:border-brand focus-visible:ring-[3px] focus-visible:ring-brand/25 md:text-[14px] lg:px-[17px] dark:bg-canvas";

interface FormFieldProps {
  label: string;
  /** Stagger delay for the scroll reveal, in ms. */
  revealDelay?: number;
  multiline?: boolean;
  className?: string;
}

type FieldProps = FormFieldProps &
  Omit<ComponentProps<"input">, "className"> &
  Omit<ComponentProps<"textarea">, "className" | "rows">;

/** Labelled text input or textarea. The label lights up while the field is focused. */
export function FormField({
  label,
  revealDelay,
  multiline,
  className,
  id,
  ...controlProps
}: FieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <Reveal delay={revealDelay} className={cn("group flex flex-col gap-[9px]", className)}>
      <Label
        htmlFor={fieldId}
        className="text-[13px] font-bold text-white transition-colors duration-300 group-focus-within:text-brand"
      >
        {label}
      </Label>
      {multiline ? (
        <Textarea
          id={fieldId}
          className={cn(controlClassName, "min-h-[110px] py-4 lg:min-h-[102px]")}
          {...controlProps}
        />
      ) : (
        <Input id={fieldId} className={cn(controlClassName, "h-[52px]")} {...controlProps} />
      )}
    </Reveal>
  );
}
