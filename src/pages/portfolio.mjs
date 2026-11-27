import { SITE } from '../templates/layout.mjs';

// Vertical 9:16 reels from the catalog
const VERTICAL = ['u030', 'u034', 'u032', 'u033', 'u031', 'u035', 'u036', 'u037', 'u038', 'u039', 'u040', 'u041', 'u042', 'u043', 'u044', 'u045', 'u046', 'u047', 'u048', 'u049'];

const CHAPTERS = [
  { id: 'kitchens', word: 'Kitchens', filter: 'kitchens', lead: 'Islands, range walls, cabinet reveals, and the hardware a homeowner runs a hand over.', hero: 'u081' },
  { id: 'baths', word: 'Baths', filter: 'baths', lead: 'Small rooms, hardest to shoot, easiest to get wrong. Brass, marble, teal, and light.', hero: 'u012' },
  { id: 'additions', word: 'Additions', filter: 'additions', lead: 'Framing at dusk, framing in the sun, and the finish that makes the before worth keeping.', hero: 'u114' },
  { id: 'whole-home', word: 'Whole homes', filter: 'whole', lead: 'Room by room, one visit, one film. The foyer, the stair, the kitchen, the bath.', hero: 'u131' },
];

function tile(id, title, vertical = false) {
  return `<button class="tile${vertical ? ' tile--v' : ''}" data-clip="${id}" aria-label="Play ${title}"><video muted playsinline loop preload="none" data-src="./media/clips/${id}.mp4" data-poster="./media/clips/${id}.jpg"></video></button>`;
}

// Pack each tile into the shortest column so the wall ends level; drift is in pixels so
// tall columns never slide out of their section.
function wall(items, cols) {
  cols = cols || (items.length < 16 ? 3 : 4);
  const columns = Array.from({ length: cols }, () => []);
  const heights = Array(cols).fill(0);
  const order = [...items.filter((it) => it.vertical), ...items.filter((it) => !it.vertical)];
  order.forEach((it) => {
    const min = Math.min(...heights);
    const candidates = heights.map((h, i) => (h === min ? i : -1)).filter((i) => i >= 0);
    const i = candidates[columns.filter((c) => c.length).length % candidates.length] ?? candidates[0];
    columns[i].push(it);
    heights[i] += it.vertical ? 1.78 : 0.5625;
  });
  // Verticals were packed first; move them to the middle of each column so the walls read mixed.
  columns.forEach((col) => { const v = col.filter((it) => it.vertical); const h = col.filter((it) => !it.vertical); const mid = Math.floor(h.length / 2); col.splice(0, col.length, ...h.slice(0, mid), ...v, ...h.slice(mid)); });
  const speeds = [-70, 35, -90, 45, -60, 30];
  return `<div class="wall wall--${cols}" data-wall>${columns.map((col, i) => `<div class="wall__col" data-col data-speed="${speeds[i]}">${col.map((it) => tile(it.id, it.title, it.vertical)).join('')}</div>`).join('')}</div>`;
}

export function portfolio(projects) {
  // A project may keep a clip on its own page but leave it off its wall (wallSkip), e.g. a stair shot
  // that reads as whole-home rather than bath.
  const byFilter = (f) => projects.filter((p) => p.filter === f).flatMap((p) => p.clips.filter((id) => !(p.wallSkip || []).includes(id)).map((id) => ({ id, title: p.title })));
  const heroMosaic = ['u081', 'u167', 'u114', 'u131', 'u086', 'u128', 'u160', 'u013', 'u029'];
  const total = new Set(projects.flatMap((p) => p.clips).concat(VERTICAL)).size;

  const chapters = CHAPTERS.map((c, i) => {
    const items = byFilter(c.filter);
    // Drop a few vertical reels into every wall so the rhythm changes
    const verts = VERTICAL.slice(i * 3, i * 3 + 3).map((id) => ({ id, title: c.word + ' reel', vertical: true }));
    const mixed = items.flatMap((it, k) => (k % 4 === 2 && verts.length ? [it, verts.shift()] : [it])).concat(verts.splice(0));
    return `
<section class="chapter" id="${c.id}" data-chapter>
  <div class="chapter__bg" data-chapter-bg><video muted playsinline loop preload="metadata" data-src="./media/clips/${c.hero}.mp4" poster="./media/clips/${c.hero}.jpg" aria-hidden="true"></video></div>
  <div class="chapter__word" data-chapter-word aria-hidden="true">${c.word}</div>
  <div class="chapter__copy">
    <p class="eyebrow">0${i + 1} &middot; ${items.length + 3} clips</p>
    <h2 class="display d-2 reveal-lines"><span class="line"><span>${c.word}</span></span></h2>
    <p class="lead fade-up">${c.lead}</p>
  </div>
</section>
<section class="section wall-section">${wall(mixed)}</section>`;
  }).join('');

  const reels = `
<section class="chapter chapter--reels" id="reels" data-chapter>
  <div class="chapter__bg" data-chapter-bg><video muted playsinline loop preload="metadata" data-src="./media/clips/u033.mp4" poster="./media/clips/u033.jpg" aria-hidden="true"></video></div>
  <div class="chapter__word" data-chapter-word aria-hidden="true">Reels</div>
  <div class="chapter__copy">
    <p class="eyebrow">05 &middot; ${VERTICAL.length} reels</p>
    <h2 class="display d-2 reveal-lines"><span class="line"><span>Cut for the feed.</span></span></h2>
    <p class="lead fade-up">Vertical, five to six seconds, hook in the first two. These go to Instagram and Facebook the week the project wraps.</p>
  </div>
</section>
<section class="section wall-section">${wall(VERTICAL.map((id) => ({ id, title: 'Reel', vertical: true })), 5)}</section>`;

  return `
<section class="pf-hero" id="pfHero">
  <div class="pf-hero__mosaic" data-mosaic aria-hidden="true">
    ${heroMosaic.map((id, i) => `<div class="pf-hero__cell" data-depth="${(i % 3) + 1}"><video muted playsinline loop preload="metadata" data-src="./media/clips/${id}.mp4" poster="./media/clips/${id}.jpg"></video></div>`).join('')}
  </div>
  <div class="pf-hero__shade"></div>
  <div class="pf-hero__copy">
    <p class="eyebrow">Portfolio &middot; ${total} clips</p>
    <h1 class="display d-1 reveal-lines"><span class="line"><span>Every clip.</span></span><span class="line"><span>Every project.</span></span></h1>
    <p class="lead fade-up">Built by Summit Custom Builders. Filmed by Nick Molina Media. Scroll, or jump to a room.</p>
    <nav class="pf-jump fade-up" aria-label="Jump to chapter">
      ${CHAPTERS.map((c) => `<a href="#${c.id}">${c.word}</a>`).join('')}<a href="#reels">Reels</a>
    </nav>
  </div>
</section>
${chapters}
${reels}
<section class="cta">
  <div class="cta__bg"><video muted playsinline loop preload="metadata" data-src="./media/clips/u081.mp4" poster="./media/clips/u081.jpg"></video></div>
  <div class="cta__in">
    <p class="eyebrow fade-up" style="justify-content:center">Want your projects here?</p>
    <h2 class="display d-1 reveal-lines"><span class="line"><span>Tell me where</span></span><span class="line"><span>and when.</span></span></h2>
    <a class="btn btn--blue btn--lg fade-up" href="./contact" data-magnetic>Book a project shoot</a>
    <p class="cta__phone fade-up">Or call or text <a href="tel:${SITE.tel}">${SITE.phone}</a></p>
  </div>
</section>`;
}
