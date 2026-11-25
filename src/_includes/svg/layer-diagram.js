/**
 * Exploded "layer by layer" drawing for the Cómo funciona section.
 * It is generated from copy.system.layers, so adding, removing or reordering
 * layers in src/_data/copy.js redraws the diagram and renumbers it.
 */

const HALF = 140; // half the width of each layer (a 2:1 isometric rhombus)
const GAP = 26; // vertical gap between layers
const THICKNESS = { base: 30, primer: 5, mesh: 5, membrane: 9, finish: 6 };
const PAD = { top: 12, right: 58, bottom: 12, left: 12 };
const ISO = 'patternTransform="matrix(1 .5 -1 .5 0 0)"';

const pts = (list) => list.map(([x, y]) => `${x},${y}`).join(" ");

export function layerDiagram(layers = []) {
  // Heights measured upward from the underside of the bottom layer.
  let z = 0;
  const stack = layers.map((layer, i) => {
    const t = THICKNESS[layer.kind] ?? 6;
    const bottom = z;
    z += t;
    const top = z;
    if (i < layers.length - 1) z += GAP;
    return { ...layer, t, bottom, top };
  });
  const total = z;

  const width = PAD.left + HALF * 2 + PAD.right;
  const height = PAD.top + total + HALF + PAD.bottom;
  const cx = PAD.left + HALF;

  const groups = stack.map((layer, i) => {
    const y = PAD.top + (total - layer.top); // top corner of the upper face
    const t = layer.t;
    const N = [cx, y];
    const E = [cx + HALF, y + HALF / 2];
    const S = [cx, y + HALF];
    const W = [cx - HALF, y + HALF / 2];
    const down = ([px, py]) => [px, py + t];
    const top = pts([N, E, S, W]);
    const left = pts([W, S, down(S), down(W)]);
    const right = pts([S, E, down(E), down(S)]);
    const labelY = E[1] + t / 2;
    const number = String(i + 1).padStart(2, "0");
    const hasPattern = ["base", "mesh", "finish"].includes(layer.kind);

    return `<g class="ld__layer ld__layer--${layer.kind}" data-layer="${i}" style="--i:${i}">
      <polygon class="ld__side ld__side--left" points="${left}"/>
      <polygon class="ld__side ld__side--right" points="${right}"/>
      <polygon class="ld__top" points="${top}"/>
      ${hasPattern ? `<polygon class="ld__texture" points="${top}" fill="url(#ld-${layer.kind})"/>` : ""}
      ${layer.kind === "base" ? `<polygon class="ld__texture" points="${left}" fill="url(#ld-hatch)"/><polygon class="ld__texture" points="${right}" fill="url(#ld-hatch)"/>` : ""}
      <polyline class="ld__edge" points="${pts([W, S, E])}"/>
      <path class="ld__leader" d="M${E[0] + 4} ${labelY}H${E[0] + 20}"/>
      <text class="ld__num" x="${E[0] + 27}" y="${labelY + 4}">${number}</text>
    </g>`;
  });

  // Dashed guides that tie the exploded layers together.
  const first = stack[0];
  const last = stack[stack.length - 1];
  const yTop = PAD.top + (total - last.top);
  const yBottom = PAD.top + (total - first.top);
  const guides = first && last && stack.length > 1
    ? [
        [cx - HALF, HALF / 2],
        [cx, HALF],
        [cx + HALF, HALF / 2],
      ]
        .map(([x, dy]) => `<path class="ld__guide" d="M${x} ${yTop + dy}V${yBottom + dy}"/>`)
        .join("")
    : "";

  return `<svg class="ld" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" aria-hidden="true" focusable="false">
    <defs>
      <pattern id="ld-base" width="18" height="18" patternUnits="userSpaceOnUse" ${ISO}>
        <circle cx="4" cy="5" r="1"/><circle cx="12" cy="13" r=".8"/><circle cx="14" cy="4" r=".6"/><circle cx="6" cy="14" r=".5"/>
      </pattern>
      <pattern id="ld-mesh" width="11" height="11" patternUnits="userSpaceOnUse" ${ISO}>
        <path d="M0 .5H11M.5 0V11"/>
      </pattern>
      <pattern id="ld-finish" width="7" height="7" patternUnits="userSpaceOnUse" ${ISO}>
        <path d="M0 .5H7"/>
      </pattern>
      <pattern id="ld-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <path d="M.5 0V6"/>
      </pattern>
    </defs>
    ${guides}
    ${groups.join("\n")}
  </svg>`;
}
