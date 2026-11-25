/*
  Scroll-triggered entrances. The "reveal-on" class is set by the small script
  in <head> (only when animations are wanted and supported), so nothing is ever
  hidden for visitors without JavaScript or with reduced motion.
*/
export function initReveal() {
  const root = document.documentElement;
  window.lionReady = true;

  // Looping hero animations rest while the hero is off screen.
  const hero = document.querySelector("[data-hero]");
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => hero.classList.toggle("is-paused", !entry.isIntersecting)).observe(hero);
  }

  if (!root.classList.contains("reveal-on")) return;

  const watch = (selector, threshold) => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  };

  watch("[data-reveal], [data-diagram]", 0.12);
  // The roof drawing waits until most of it is on screen, so the line is seen being drawn.
  watch("[data-draw]", 0.55);
}
