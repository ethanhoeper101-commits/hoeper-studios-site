"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";

/**
 * Sticky bottom call-to-action shown on mobile only.
 * Appears once the user scrolls past the hero and hides while the
 * demo form is in view (so it never covers the thing it points to).
 */
export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const demo = document.getElementById("demo");
    const footer = document.getElementById("contact");

    function update() {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.85;

      const overlapsForm = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };

      const nearTarget = overlapsForm(demo) || overlapsForm(footer);
      setVisible(scrolledPastHero && !nearTarget);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden"
        >
          <a
            href="#demo"
            className="btn-gold flex items-center justify-between rounded-sm bg-gold px-5 py-4 text-black shadow-[0_-8px_40px_-6px_rgba(0,0,0,0.7)]"
          >
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-widest">GET YOUR FREE DEMO</span>
              <span className="text-[11px] font-medium text-black/70">
                No cost · No commitment
              </span>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/15">
              <IconArrowRight size={20} stroke={2.2} />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
