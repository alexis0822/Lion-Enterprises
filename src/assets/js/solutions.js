/* Solutions: filter by type of customer, and carry the chosen solution into the form. */
export function initSolutions() {
  const group = document.querySelector("[data-filter]");
  const list = document.querySelector("[data-cards]");
  const cards = [...document.querySelectorAll("[data-card]")];

  // Phones: progress bar under the sideways-scrolling cards.
  const rail = document.querySelector("[data-rail]");
  const thumb = rail?.querySelector("[data-rail-thumb]");
  let queued = false;
  const updateRail = () => {
    queued = false;
    if (!rail || !list) return;
    const range = list.scrollWidth - list.clientWidth;
    const count = cards.filter((card) => !card.hidden).length;
    rail.hidden = range <= 1 || count < 2;
    if (rail.hidden) return;
    const progress = Math.min(1, Math.max(0, list.scrollLeft / range));
    thumb.style.width = `${100 / count}%`;
    thumb.style.transform = `translateX(${progress * (count - 1) * 100}%)`;
  };
  if (rail && list) {
    const request = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(updateRail);
    };
    list.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    updateRail();
  }

  if (group && cards.length) {
    const buttons = [...group.querySelectorAll("[data-filter-btn]")];
    const status = group.querySelector("[data-filter-status]");

    const apply = (requested) => {
      const key = buttons.some((button) => button.dataset.filterBtn === requested) ? requested : "todos";
      buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.filterBtn === key)));

      let shown = 0;
      for (const card of cards) {
        const match = key === "todos" || card.dataset.audiences.split(" ").includes(key);
        card.hidden = !match;
        card.classList.remove("is-entering");
        if (match) {
          card.style.setProperty("--i", shown);
          shown += 1;
        }
      }

      // Reading a layout value restarts the entrance animation.
      void group.offsetWidth;
      cards.forEach((card) => card.classList.toggle("is-entering", !card.hidden));
      if (list) list.scrollLeft = 0;
      updateRail();

      if (status) {
        status.textContent = status.dataset.template.replace("{shown}", shown).replace("{total}", cards.length);
      }
    };

    buttons.forEach((button) => button.addEventListener("click", () => apply(button.dataset.filterBtn)));

    // "Para tu casa / contratistas / negocio" links jump to the list already filtered.
    document.querySelectorAll("[data-filter-link]").forEach((link) => {
      link.addEventListener("click", () => apply(link.dataset.filterLink));
    });
  }

  // "Solicitar información" on a card preselects that topic in the form.
  const select = document.querySelector("[data-topic-select]");
  if (select) {
    document.querySelectorAll("[data-topic]").forEach((link) => {
      link.addEventListener("click", () => {
        const option = [...select.options].find((candidate) => candidate.value === link.dataset.topic);
        if (option) select.value = option.value;
      });
    });
  }
}
