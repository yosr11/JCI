import { useEffect, useRef } from "react";

/**
 * Attaches a scroll-reveal IntersectionObserver to the returned ref.
 * Elements inside with the class `reveal` will get `revealed` added
 * when they enter the viewport.
 *
 * Respects `prefers-reduced-motion`: if motion is reduced the class
 * is added immediately without waiting for scroll.
 *
 * @param {object} options
 * @param {number} [options.threshold=0.12]  Fraction visible before triggering
 * @param {string} [options.rootMargin="0px 0px -40px 0px"]
 * @returns {React.RefObject}
 */
export default function useScrollReveal({
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // If the user prefers reduced motion, reveal everything immediately
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = container.querySelectorAll(".reveal");

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
