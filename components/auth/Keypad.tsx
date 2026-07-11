import { Delete } from 'lucide-react';
import { KeypadButton } from './KeypadButton';

interface KeypadProps {
  onDigit: (digit: string) => void;
  onBackspace: () => void;
  disabled?: boolean;
}

const DIGIT_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

export function Keypad({ onDigit, onBackspace, disabled = false }: KeypadProps) {
  return (
    <div className="mx-auto grid max-w-xs grid-cols-3 place-items-center gap-y-4">
      {DIGIT_ROWS.flat().map((digit) => (
        <KeypadButton key={digit} aria-label={`Angka ${digit}`} onPress={() => !disabled && onDigit(digit)}>
          {digit}
        </KeypadButton>
      ))}

      <KeypadButton variant="ghost" aria-label="" onPress={() => {}}>
        {null}
      </KeypadButton>

      <KeypadButton aria-label="Angka 0" onPress={() => !disabled && onDigit('0')}>
        0
      </KeypadButton>

      <KeypadButton variant="action" aria-label="Hapus" onPress={() => !disabled && onBackspace()}>
        <Delete size={24} />
      </KeypadButton>
    </div>
  );
}
