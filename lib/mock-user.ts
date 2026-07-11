/**
 * DEMO DATA ONLY.
 *
 * This lets the PIN screen be interactive without a backend. It is not a
 * real auth pattern — a real implementation must never store or compare a
 * PIN client-side. Send the entered PIN to a server route, hash+compare it
 * there against a securely stored credential, and issue an httpOnly session
 * cookie (or similar) on success. Swap `checkPin` below for that API call.
 */
export const mockUser = {
  name: '(Your Name)',
  pin: '123456',
};

export async function checkPin(pin: string): Promise<boolean> {
  // Placeholder for: `await fetch('/api/auth/pin', { method: 'POST', body: pin })`
  return pin === mockUser.pin;
}
