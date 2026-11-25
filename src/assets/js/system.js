/* Cómo funciona: the open step lights up its layer in the drawing, and tapping a layer opens its step. */
export function initSystem() {
  const root = document.querySelector("[data-system]");
  if (!root) return;

  const steps = [...root.querySelectorAll("[data-step]")];
  const layers = [...root.querySelectorAll("[data-layer]")];

  const sync = () => {
    const open = steps.find((step) => step.open);
    layers.forEach((layer) => {
      layer.classList.toggle("is-active", Boolean(open) && layer.dataset.layer === open.dataset.step);
    });
  };

  steps.forEach((step) => {
    step.addEventListener("toggle", () => {
      // <details name> keeps a single step open in current browsers; this covers older ones.
      if (step.open) {
        steps.forEach((other) => {
          if (other !== step) other.open = false;
        });
      }
      sync();
    });
  });

  layers.forEach((layer) => {
    layer.addEventListener("click", () => {
      const step = steps.find((candidate) => candidate.dataset.step === layer.dataset.layer);
      if (step) step.open = true;
    });
  });

  sync();
}
