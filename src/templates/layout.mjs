export const SITE = {
  name: 'Nick Molina Media',
  url: 'https://nickmolinamedia.com',
  phone: '720-625-2561',
  tel: '+17206252561',
  email: 'nick.molina@icloud.com',
  instagram: 'https://instagram.com/nickmolinamedia',
  facebook: 'https://facebook.com/nickmolinamedia',
};

export function layout({ title, description, body, bodyClass = '', depth = 0, path = '/', jsonld = [], noindex = false, preload = [] }) {
  const base = depth ? '../'.repeat(depth) : './';
  const canonical = SITE.url + path;
  // Schema.org JSON-LD. Only facts that are visible on the page go in here.
  // LCP image hints: each entry is { href, media? } relative to the site root.
  const pre = preload.map((p) => `  <link rel="preload" as="image" href="${base}${p.href}"${p.media ? ` media="${p.media}"` : ''} fetchpriority="high" />`).join('\n');
  const ld = jsonld.map((o) => `  <script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="google-site-verification" content="hNs9WKeh98aD4-5BlXLDbZ21_9GgjOyPZLIfHE_EV2A" />
${noindex ? '  <meta name="robots" content="noindex" />\n' : ''}  <meta name="theme-color" content="#000C26" />
  <link rel="icon" href="${base}brand/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="${base}brand/favicon-32.png" />
  <link rel="apple-touch-icon" href="${base}brand/apple-touch-icon.png" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${SITE.url}/brand/og.png" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE.name}" />
  <meta name="twitter:card" content="summary_large_image" />
${ld}
${pre}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${base}src/styles.css" />
  <script>try{if(sessionStorage.getItem('nmm-t')){document.documentElement.classList.add('is-arriving')}}catch(e){}</script>
</head>
<body class="${bodyClass}" data-base="${base}">
  <a class="skip" href="#main">Skip to content</a>
  <div class="progress" id="progress" aria-hidden="true"></div>
  <div class="curtain curtain--edge" id="curtainEdge" aria-hidden="true"></div>
  <div class="curtain" id="curtain" aria-hidden="true"><span class="curtain__name">Nick Molina <em>Media</em></span></div>
  <header class="nav" id="nav">
    <a class="nav__brand" href="${base}" aria-label="Nick Molina Media home">
      <img class="nav__logo nav__logo--light" src="${base}brand/lockup-light.png" alt="Nick Molina Media" width="1708" height="300" />
      <img class="nav__logo nav__logo--walnut" src="${base}brand/lockup-walnut.png" alt="" width="1708" height="300" />
    </a>
    <nav class="nav__links" aria-label="Primary">
      <a href="${base}work">Work</a>
      <a href="${base}portfolio">Portfolio</a>
      <a href="${base}builders">For Builders</a>
      <a href="${base}#packages">Pricing</a>
      <a href="${base}about">About</a>
    </nav>
    <a class="btn btn--blue nav__cta" href="${base}contact" data-magnetic>Book a shoot</a>
    <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
      <span></span><span></span>
    </button>
  </header>
  <div class="menu" id="menu" aria-hidden="true">
    <nav class="menu__links">
      <a href="${base}">Home</a>
      <a href="${base}work">Work</a>
      <a href="${base}portfolio">Portfolio</a>
      <a href="${base}builders">For Builders</a>
      <a href="${base}#packages">Pricing</a>
      <a href="${base}about">About</a>
      <a href="${base}contact">Contact</a>
    </nav>
    <p class="menu__foot">Denver &middot; Front Range &middot; <a href="tel:${SITE.tel}">${SITE.phone}</a></p>
  </div>

  <div id="smooth-wrapper"><div id="smooth-content">
  <main id="main">
${body}
  </main>
  <footer class="footer">
    <div class="footer__top">
      <p class="footer__big reveal-lines"><span class="line"><span>Your last job should</span></span><span class="line"><span><em>sell your next one.</em></span></span></p>
      <a class="btn btn--blue btn--lg" href="${base}contact" data-magnetic>Book a project shoot</a>
    </div>
    <div class="footer__grid">
      <div>
        <img class="footer__logo" src="${base}brand/logo-light.png" alt="Nick Molina Media" width="1000" height="639" />
        <p class="muted">Cinematic video and photography for Colorado builders and remodelers. Denver metro and the Front Range.</p>
      </div>
      <nav class="footer__links" aria-label="Footer">
        <a href="${base}work">Work</a>
        <a href="${base}portfolio">Portfolio</a>
        <a href="${base}builders">For Builders</a>
        <a href="${base}#packages">Pricing</a>
        <a href="${base}about">About</a>
        <a href="${base}contact">Contact</a>
      </nav>
      <div class="footer__links">
        <a href="${SITE.instagram}" rel="noopener">Instagram</a>
        <a href="${SITE.facebook}" rel="noopener">Facebook</a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:${SITE.tel}">${SITE.phone}</a>
      </div>
    </div>
    <p class="footer__legal">&copy; ${new Date().getFullYear()} Nick Molina Media. Projects shown were built by Summit Custom Builders and filmed on site.</p>
    <p class="footer__mark" id="footerMark" aria-hidden="true"><span class="line"><span>Nick</span></span> <span class="line"><span>Molina</span></span> <span class="line"><span><em>Media</em></span></span></p>
  </footer>
  </div></div>

  <a class="mobile-cta" href="${base}contact">Book a shoot</a>

  <div class="modal" id="filmModal" aria-hidden="true" role="dialog" aria-label="Project film">
    <button class="modal__close" id="filmClose" aria-label="Close">&times;</button>
    <div class="modal__body"><video id="filmVideo" controls playsinline preload="none"></video></div>
  </div>

  <script type="module" src="${base}src/main.js"></script>
</body>
</html>`;
}

export function video(src, { poster, cls = '', base = './' } = {}) {
  const p = poster ? ` poster="${base}media/${poster}"` : '';
  return `<video class="${cls}" muted playsinline loop preload="metadata" data-src="${base}media/${src}"${p}></video>`;
}

// Full-bleed footage hero for inner pages. The frame opens like a film gate on arrival (see main.js).
// `lines` is the h1, one entry per line; `media` is a path under /media without extension.
export function filmHero({ lines, lead = '', media, poster, base = './', foot = '', cls = '' }) {
  const p = poster || media + '.jpg';
  return `
<section class="film-hero ${cls}" data-film-hero>
  <div class="film-hero__media"><video muted playsinline loop autoplay preload="auto" poster="${base}media/${p}" src="${base}media/${media}.mp4" aria-hidden="true"></video></div>
  <div class="film-hero__shade"></div>
  <div class="film-hero__copy">
    <h1 class="display d-1 film-hero__title">${lines.map((l) => `<span class="line"><span>${l}</span></span>`).join('')}</h1>
    ${lead ? `<p class="lead film-hero__lead fh-in">${lead}</p>` : ''}
    ${foot ? `<div class="film-hero__foot fh-in">${foot}</div>` : ''}
  </div>
</section>`;
}

// The six trades, each over its own clip. Phones get a swipeable row; larger screens a grid.
const WHO = [
  ['u136', 'Custom home builders', 'Whole homes, filmed at the finish and along the way.'],
  ['u097', 'Remodelers and design-build', 'Whole-home and main-level remodels with a real before.'],
  ['u086', 'Kitchen and bath specialists', 'The rooms homeowners search for first, and judge hardest.'],
  ['u114', 'Additions and ADUs', 'Framing to finish, the transformation homeowners want to see.'],
  ['u023', 'Outdoor living and pools', 'Decks, patios, and backyards that sell best at dusk.'],
  ['u157', 'The trades behind them', 'Cabinets, tile, counters, framing. Licensed footage of your part of the job.'],
];
export function whoGrid(href, base = './') {
  return `<div class="who__grid" data-slider>
      ${WHO.map(([id, h, t]) => `<a class="who__card who__card--live fade-up" href="${href}"><video class="who__bg" muted playsinline loop preload="metadata" data-src="${base}media/clips/${id}.mp4" poster="${base}media/clips/${id}.jpg" aria-hidden="true"></video><div class="who__body"><h3>${h}</h3><p>${t}</p></div></a>`).join('\n      ')}
    </div>
    <div class="slider-bar" aria-hidden="true"><i></i></div>`;
}
