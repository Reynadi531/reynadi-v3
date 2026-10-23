import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(200),
  message: z.string().trim().min(1).max(2000),
  turnstileToken: z.string().min(1).max(2048),
});

export type Inquiry = z.infer<typeof inquirySchema>;

const siteverifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function passesTurnstile(token: string, secret: string, remoteIp?: string) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (remoteIp) body.append("remoteip", remoteIp);

  const response = await fetch(siteverifyUrl, {
    method: "POST",
    body,
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) return false;

  const outcome = (await response.json()) as { success?: boolean };
  return outcome.success === true;
}

async function forwardToFormspree(url: string, { name, email, message }: Inquiry) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // `email` doubles as Formspree's reply-to; `_subject` sets the notification subject.
    body: JSON.stringify({ name, email, message, _subject: `Project inquiry from ${name}` }),
    signal: AbortSignal.timeout(10_000),
  });
  return response.ok;
}

/**
 * Accepts a project inquiry once its Turnstile token checks out, then forwards it to Formspree.
 * Both the Turnstile secret and the Formspree endpoint stay on the server.
 */
export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { ENV } = await import("@/env.server");
    const { getRequestIP } = await import("@tanstack/react-start/server");

    const human = await passesTurnstile(
      data.turnstileToken,
      ENV.TURNSTILE_SECRET_KEY,
      getRequestIP({ xForwardedFor: true }),
    );
    if (!human) throw new Error("Verification failed. Please try again.");

    if (!(await forwardToFormspree(ENV.FORMSPREE_URL, data))) {
      throw new Error("Couldn’t deliver the message. Please try again.");
    }
    return { ok: true as const };
  });
