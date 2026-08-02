"use client";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({
  checked,
  onChange,
  disabled = false,
}: SwitchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`
        relative
        inline-flex
        h-7
        w-12
        items-center
        rounded-full
        transition-all
        duration-300

        ${
          checked
            ? "bg-accent"
            : "bg-zinc-700"
        }

        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }
      `}
    >
      <span
        className={`
          absolute
          h-5
          w-5
          rounded-full
          bg-white
          shadow-md
          transition-all
          duration-300

          ${
            checked
              ? "translate-x-6"
              : "translate-x-1"
          }
        `}
      />
    </button>
  );
}