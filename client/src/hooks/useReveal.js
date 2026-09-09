import { useEffect, useRef } from "react";

/**
 * Adds `data-revealed` to the element the first time it scrolls into view,
 * which the CSS in index.css uses to run the fade-up transition.
 */
export function useReveal(options) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-revealed", "");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
