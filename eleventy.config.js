import * as esbuild from "esbuild";
import { layerDiagram } from "./src/_includes/svg/layer-diagram.js";

// Oldest browsers the CSS/JS output is compiled for.
const TARGET = ["chrome109", "edge109", "firefox115", "safari15.4", "ios15.4"];

/** Bundle + minify one CSS or JS entry file and return it as a string (it is inlined into the page). */
async function bundle(entry) {
  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    write: false,
    target: TARGET,
    format: "iife",
    external: ["/fonts/*"],
    logLevel: "warning",
  });
  return result.outputFiles[0].text.trim();
}

export default function (eleventyConfig) {
  // Everything in src/public is copied to the site root as-is (fonts, icons, social image, headers).
  eleventyConfig.addPassthroughCopy({ "src/public": "/" });
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "images" });
  eleventyConfig.addWatchTarget("./src/assets/");

  eleventyConfig.addAsyncShortcode("css", () => bundle("src/assets/css/main.css"));
  eleventyConfig.addAsyncShortcode("js", () => bundle("src/assets/js/main.js"));
  eleventyConfig.addShortcode("layerDiagram", (layers) => layerDiagram(layers));

  // "07" style counters for numbered lists.
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));
  // JSON that is safe to print inside a <script> tag.
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value).replace(/</g, "\\u003c"));
  // Fills {phone} and {email} placeholders in copy strings.
  eleventyConfig.addFilter("fill", (text, site) =>
    String(text ?? "")
      .replaceAll("{phone}", site.phone.display)
      .replaceAll("{email}", site.email),
  );

  eleventyConfig.addGlobalData("build", { year: new Date().getFullYear() });

  eleventyConfig.on("eleventy.before", () => {
    if (!process.env.SITE_URL && !process.env.URL) {
      console.warn(
        "[lion] SITE_URL is not set: canonical URL, sitemap.xml and absolute social-preview URLs are skipped. Set it before launch (see README).",
      );
    }
  });

  return {
    dir: { input: "src", output: "dist", includes: "_includes", data: "_data" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
