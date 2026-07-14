"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface MonthOption {
  label: string;
  value: number;
}

interface MonthSelectorProps {
  value: MonthOption;
  options: MonthOption[];
  onChange: (month: MonthOption) => void;
}

export function MonthSelector({
  value,
  options,
  onChange,
}: MonthSelectorProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  return (
    <div
      ref={ref}
      className="relative inline-block"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((o) => !o)
        }
        className="flex items-center gap-2 text-lg text-ink"
      >
        {value.label}

        <ChevronDown
          size={18}
          className={cn(
            "transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul className="absolute left-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-surface-raised py-2 shadow-xl">

          {options.map((option) => (

            <li
              key={option.value}
            >

              <button
                type="button"
                onClick={() => {
                  onChange(option);

                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-sm transition hover:bg-white/5",
                  option.value ===
                    value.value
                    ? "text-accent"
                    : "text-ink"
                )}
              >
                {option.label}
              </button>

            </li>

          ))}

        </ul>
      )}

    </div>
  );
}