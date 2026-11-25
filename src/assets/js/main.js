/*
  Lion Enterprises — behaviour. Bundled and inlined at build time.
  The page is fully readable and its links work without any of this;
  each piece below adds one enhancement and fails on its own.
*/
import { initReveal } from "./reveal.js";
import { initHeader } from "./header.js";
import { initMenu } from "./menu.js";
import { initSolutions } from "./solutions.js";
import { initSystem } from "./system.js";
import { initCtaBar } from "./cta-bar.js";
import { initForm } from "./form.js";

for (const init of [initReveal, initHeader, initMenu, initSolutions, initSystem, initCtaBar, initForm]) {
  try {
    init();
  } catch (error) {
    // Never leave content hidden behind an animation that will not run.
    document.documentElement.classList.remove("reveal-on");
    console.error(error);
  }
}
