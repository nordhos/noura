import { Fingerprint } from 'lucide-react';

interface FingerprintButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

/**
 * In production this triggers the platform biometric prompt (WebAuthn /
 * native bridge), not an instant success — wire `onPress` up to that flow.
 */
export function FingerprintButton({ onPress, disabled = false }: FingerprintButtonProps) {
  return (
    <div className="flex flex-col items-center gap-2 border-t border-border pt-6">
      <button
        type="button"
        onClick={onPress}
        disabled={disabled}
        aria-label="Gunakan fingerprint untuk masuk"
        className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-dim text-accent transition-colors active:bg-accent-soft disabled:opacity-40"
      >
        <Fingerprint size={30} />
      </button>
      <span className="text-sm text-ink-muted">Gunakan Fingerprint</span>
    </div>
  );
}
