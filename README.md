# NOURA Dashboard

Next.js (App Router) + TypeScript + Tailwind reconstruction of the NOURA
"Financial Clarity System" home screen, broken into reusable components.

## Setup

```bash
npm install
npm run dev
```

Requires normal internet access at build time — `app/layout.tsx` loads Inter
and Plus Jakarta Sans via `next/font/google`. (In the sandbox this was built
in, outbound access to fonts.googleapis.com is blocked, so the full
production build was verified with system fonts swapped in temporarily; the
component code itself type-checks and compiles cleanly either way.)

## Auth flow

- `/` — PIN login screen (`components/auth/LoginScreen.tsx`)
- `/dashboard` — the dashboard from before

Demo PIN is `123456` (see `lib/mock-user.ts`) and the fingerprint button
skips straight to `/dashboard` — both are UI-only stand-ins. **Do not treat
this as real auth**: a real version must validate the PIN server-side and
issue a proper session; see the comment in `lib/mock-user.ts` for what to
swap in. There's also no route protection yet — visiting `/dashboard`
directly currently bypasses the PIN screen entirely, since that requires a
real session/cookie check (e.g. Next.js middleware) which needs a real
backend to check against.

## What's exact vs. estimated

Reproduced exactly from the screenshot: copy/labels, layout structure, the
Rp120.000 / 69% expense figures, and the Rp0 / 0% balance figures.

Estimated / invented, and worth double-checking against real brand assets
before shipping:
- Exact hex values for background/surface/accent — sampled visually, not
  extracted from a design file (`tailwind.config.ts`).
- Typefaces — the screenshot's font isn't identifiable with certainty, so
  Inter/Plus Jakarta Sans were chosen as a close, legible stand-in.
- The two-tone "N" logomark (`DashboardHeader.tsx`) is a rough approximation.
- The wave/network background texture on the Sisa Saldo card
  (`BalanceCard.tsx`) is a decorative approximation, not a traced asset.
- Individual income amounts — both are masked (dots) in the screenshot and
  never revealed, so `lib/mock-data.ts` uses placeholder numbers. These are
  intentionally **not** used to derive the 69%/0% figures above, because the
  screenshot's own numbers don't reconcile into one consistent income total
  — see the comment in `mock-data.ts`.
- Interaction behavior not observable from a static image (dropdown
  open/close, outside-click-to-close, which nav item counts as "active") —
  implemented with reasonable, standard defaults.
- Login screen: the screenshot only shows the *empty* PIN state, so the
  filled-dot styling, wrong-PIN shake/error message, and keypad
  disable-while-checking behavior are all reasonable standard patterns, not
  things confirmed from the image. The backspace glyph uses lucide's
  `Delete` icon as a close match to the tag-with-x shape shown.

## Structure

See the chat response for the full folder tree and component hierarchy
explanation.
