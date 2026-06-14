"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";

export type SelectOption = { value: string; label: string };

interface CustomSelectProps {
  id: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder: string;
  error?: boolean;
  onChange: (name: string, value: string) => void;
}

export default function CustomSelect({
  id,
  name,
  value,
  options,
  placeholder,
  error = false,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value) ?? null;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  function openMenu() {
    const current = options.findIndex((o) => o.value === value);
    setHighlight(current >= 0 ? current : 0);
    setOpen(true);
  }

  function choose(index: number) {
    const opt = options[index];
    if (!opt) return;
    onChange(name, opt.value);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlight((h) => (h + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlight((h) => (h - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(highlight);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  const borderClass = open
    ? "border-gold/60"
    : error
    ? "border-red-500/60"
    : "border-white/10 hover:border-gold/40";

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && highlight >= 0 ? `${listId}-opt-${highlight}` : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between gap-3 bg-black/40 border ${borderClass} text-left text-base md:text-xl px-4 md:px-8 py-4 md:py-6 rounded-sm transition-colors focus:outline-none focus:border-gold/60 cursor-pointer`}
      >
        <span className={selected ? "text-white" : "text-white/30"}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0 text-gold"
        >
          <IconChevronDown size={22} stroke={2} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            style={{
              background:
                "linear-gradient(160deg, rgba(14,12,8,0.98) 0%, rgba(0,0,0,0.98) 100%)",
              boxShadow:
                "0 24px 60px -18px rgba(0,0,0,0.9), 0 0 0 1px rgba(201,168,76,0.12)",
            }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-sm border border-gold/30 backdrop-blur-sm"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === highlight;
              return (
                <li
                  key={opt.value}
                  id={`${listId}-opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => choose(i)}
                  className={`relative flex items-center justify-between gap-3 px-4 md:px-8 py-4 md:py-5 cursor-pointer select-none text-base md:text-lg transition-colors ${
                    i > 0 ? "border-t border-white/[0.06]" : ""
                  } ${
                    isActive
                      ? "bg-gold/[0.08] text-gold-light"
                      : isSelected
                      ? "text-gold"
                      : "text-white/70"
                  }`}
                >
                  {/* Gold accent bar on the active row */}
                  <motion.span
                    aria-hidden
                    initial={false}
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-0 bottom-0 w-[3px] origin-center bg-gold"
                  />
                  <span>{opt.label}</span>
                  {isSelected && (
                    <IconCheck size={20} stroke={2.5} className="shrink-0 text-gold" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
