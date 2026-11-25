/*
  Fixed contact bar (phones). It appears once the hero buttons have scrolled away
  and steps aside in the contact section and while the visitor is typing.
*/
export function initCtaBar() {
  const bar = document.querySelector("[data-cta-bar]");
  if (!bar) return;

  const actions = document.querySelector("[data-hero-actions]");
  if (!actions || !("IntersectionObserver" in window)) {
    bar.classList.add("is-visible");
    return;
  }

  const contact = document.querySelector("[data-contact]");
  const state = { pastHero: false, inContact: false, typing: false };
  const update = () => bar.classList.toggle("is-visible", state.pastHero && !state.inContact && !state.typing);

  new IntersectionObserver(([entry]) => {
    state.pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    update();
  }).observe(actions);

  if (contact) {
    new IntersectionObserver(
      ([entry]) => {
        state.inContact = entry.isIntersecting;
        update();
      },
      { rootMargin: "0px 0px -30% 0px" },
    ).observe(contact);
  }

  document.addEventListener("focusin", (event) => {
    state.typing = event.target instanceof Element && event.target.matches("input, textarea, select");
    update();
  });
  document.addEventListener("focusout", () => {
    state.typing = false;
    update();
  });
}
