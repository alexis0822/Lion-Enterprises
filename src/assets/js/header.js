/* Top bar: border once scrolled, slide away on phones while reading down, mark the current section. */
export function initHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;

  const root = document.documentElement;
  const compact = window.matchMedia("(max-width: 63.99em)");
  let lastY = window.scrollY;
  let travelled = 0;
  let queued = false;

  const update = () => {
    queued = false;
    const y = Math.max(0, window.scrollY);
    const delta = y - lastY;
    lastY = y;
    header.classList.toggle("is-scrolled", y > 8);

    if (!compact.matches || y < 160 || root.classList.contains("menu-open")) {
      header.classList.remove("is-hidden");
      travelled = 0;
      return;
    }

    // Add up movement in one direction so small jitters do not toggle the bar.
    travelled = Math.sign(delta) === Math.sign(travelled) ? travelled + delta : delta;
    if (travelled > 56) header.classList.add("is-hidden");
    else if (travelled < -16) header.classList.remove("is-hidden");
  };

  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  header.addEventListener("focusin", () => header.classList.remove("is-hidden"));
  update();

  // Desktop navigation: mark the section being read.
  if (!("IntersectionObserver" in window)) return;
  const links = new Map();
  header.querySelectorAll(".site-nav__link").forEach((link) => {
    const section = link.hash && document.getElementById(link.hash.slice(1));
    if (section) links.set(section, link);
  });
  if (!links.size) return;

  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = links.get(entry.target);
        if (entry.isIntersecting) {
          links.forEach((other) => other.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  links.forEach((_, section) => spy.observe(section));
}
