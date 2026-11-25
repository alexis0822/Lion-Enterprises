/* Phone menu: a native <dialog>, so focus is contained and Escape closes it. */
export function initMenu() {
  const menu = document.querySelector("[data-menu]");
  const opener = document.querySelector("[data-menu-open]");
  if (!menu || !opener) return;

  if (typeof menu.showModal !== "function") {
    // Very old browsers: the button takes the visitor to the links in the footer.
    opener.addEventListener("click", () => document.getElementById("pie")?.scrollIntoView());
    return;
  }

  const root = document.documentElement;
  const desktop = window.matchMedia("(min-width: 64em)");
  opener.setAttribute("aria-expanded", "false");

  opener.addEventListener("click", () => {
    menu.showModal();
    root.classList.add("menu-open");
    opener.setAttribute("aria-expanded", "true");
  });

  menu.querySelector("[data-menu-close]")?.addEventListener("click", () => menu.close());

  menu.addEventListener("click", (event) => {
    if (!event.target.closest("[data-menu-link]")) return;
    menu.close();
    // Let the link's target, not the menu button, be where keyboard focus continues.
    opener.blur();
  });

  menu.addEventListener("close", () => {
    root.classList.remove("menu-open");
    opener.setAttribute("aria-expanded", "false");
  });

  desktop.addEventListener("change", (event) => {
    if (event.matches && menu.open) menu.close();
  });
}
