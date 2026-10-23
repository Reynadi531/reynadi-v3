import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import type { Ref } from "react";

import { Reveal } from "@/components/motion/reveal";
import { ENV } from "@/env";

interface TurnstileFieldProps {
  /** Lets the parent reset the widget, e.g. after a failed submission (tokens are single use). */
  ref?: Ref<TurnstileInstance>;
  /** Called with the token once solved, and with `null` when it expires or errors. */
  onToken: (token: string | null) => void;
  /** Stagger delay for the scroll reveal, in ms. */
  revealDelay?: number;
}

/** Cloudflare Turnstile challenge, sized to its container. Space is reserved to avoid layout shift. */
export function TurnstileField({ ref, onToken, revealDelay }: TurnstileFieldProps) {
  return (
    <Reveal delay={revealDelay} className="min-h-[65px]">
      <Turnstile
        ref={ref}
        siteKey={ENV.TURNSTILE_SITE_KEY}
        options={{ theme: "dark", size: "flexible" }}
        onSuccess={onToken}
        onExpire={() => onToken(null)}
        onError={() => onToken(null)}
      />
    </Reveal>
  );
}
