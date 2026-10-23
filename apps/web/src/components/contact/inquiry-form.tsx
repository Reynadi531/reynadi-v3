import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { Button } from "@reynad-v3/ui/components/button";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/site/eyebrow";
import { FormField } from "@/components/site/form-field";
import { Heading } from "@/components/site/heading";
import { TurnstileField } from "@/components/site/turnstile-field";
import { submitInquiry } from "@/lib/inquiry";

/**
 * Project inquiry form, guarded by Cloudflare Turnstile. The server verifies the challenge, then
 * forwards the message to Formspree.
 */
export function InquiryForm() {
  const [token, setToken] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const turnstile = useRef<TurnstileInstance>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token || pending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    try {
      await submitInquiry({
        data: {
          name: String(data.get("name")),
          email: String(data.get("email")),
          message: String(data.get("message")),
          turnstileToken: token,
        },
      });
      toast.success("Inquiry sent", { description: "Thanks! I’ll get back to you soon." });
      form.reset();
    } catch {
      toast.error("Couldn’t send your inquiry", {
        description: "Something went wrong on the way. Please try again in a moment.",
      });
    } finally {
      // Tokens are single use, so every attempt needs a fresh challenge.
      turnstile.current?.reset();
      setToken(null);
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-[23px] bg-canvas-raised px-6 pt-[65px] pb-[75px] lg:min-w-0 lg:flex-1 lg:gap-[25px] lg:rounded-[14px] lg:p-[38px]"
    >
      <div className="flex flex-col gap-[23px] lg:gap-[9px]">
        <Reveal className="lg:hidden">
          <Eyebrow>Or leave a note</Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <Heading
            size="xs"
            className="text-[33px]/[1.12] tracking-[-1.2px] lg:text-[25px]/[normal] lg:font-extrabold lg:tracking-[-0.8px]"
          >
            <span className="lg:hidden">
              Tell me about
              <br />
              your project.
            </span>
            <span className="hidden lg:inline">Tell me about your project</span>
          </Heading>
        </Reveal>
        <Reveal delay={150} className="hidden lg:block">
          <p className="text-[15px] text-fg-subtle">
            A little context helps us start in the right place.
          </p>
        </Reveal>
      </div>

      <FormField
        label="Your name"
        name="name"
        autoComplete="name"
        placeholder="How should I address you?"
        required
        revealDelay={120}
      />
      <FormField
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Where can I reach you?"
        required
        revealDelay={200}
      />
      <FormField
        multiline
        label="What are you working on?"
        name="message"
        placeholder="A few words about your idea or challenge"
        required
        revealDelay={280}
      />

      <TurnstileField ref={turnstile} onToken={setToken} revealDelay={340} />

      <Reveal delay={400}>
        <Button
          type="submit"
          disabled={!token || pending}
          className="group h-auto w-full justify-between rounded-lg bg-brand px-[18px] py-[17px] text-[15px] font-bold text-white hover:bg-brand/85 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-raised lg:px-5 lg:py-4 [&_svg:not([class*='size-'])]:size-[18px]"
        >
          {pending ? "Sending…" : "Send inquiry"}
          <ArrowUpRight
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Button>
      </Reveal>
    </form>
  );
}
