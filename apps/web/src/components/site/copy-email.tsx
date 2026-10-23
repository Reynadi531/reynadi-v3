import { Button } from "@reynad-v3/ui/components/button";
import { cn } from "@reynad-v3/ui/lib/utils";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { readContactEmail } from "@/lib/contact-email";

/** Copies the email address to the clipboard. The address itself is never shown on the page. */
export function CopyEmailButton({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(readContactEmail());
    } catch {
      toast.error("Couldn’t copy the email", {
        description: "Your browser blocked clipboard access.",
      });
      return;
    }
    setCopied(true);
    toast.success("Email copied to clipboard");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  return (
    <Button
      type="button"
      onClick={copy}
      className={cn(
        "group h-auto w-fit gap-7 rounded-lg bg-canvas-raised px-[22px] py-[17px] text-[15px] font-bold text-white ring-1 ring-line-strong ring-inset hover:bg-white/10 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/60 [&_svg:not([class*='size-'])]:size-[18px]",
        className,
      )}
    >
      <span aria-live="polite">{copied ? "Email copied" : "Copy email address"}</span>
      <span aria-hidden className="relative size-[18px] shrink-0">
        <Copy
          className={cn(
            "absolute inset-0 transition-[opacity,scale] duration-300 group-hover:text-brand",
            copied && "scale-50 opacity-0",
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 text-brand transition-[opacity,scale] duration-300",
            !copied && "scale-50 opacity-0",
          )}
        />
      </span>
    </Button>
  );
}
