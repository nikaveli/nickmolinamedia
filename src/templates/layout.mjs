export const SITE = {
  name: 'Nick Molina Media',
  url: 'https://nickmolinamedia.com',
  phone: '303-524-0591',
  tel: '+13035240591',
  email: 'nick.molina@icloud.com',
  instagram: 'https://instagram.com/nickmolinamedia',
  facebook: 'https://facebook.com/nickmolinamedia',
};

export function layout({ title, description, body, bodyClass = '', depth = 0 }) {
  const base = depth ? '../'.repeat(depth) : './';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="theme-color" content="#000C26" />
  <link rel="icon" href="${base}brand/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="32x32" href="${base}brand/favicon-32.png" />
  <link rel="apple-touch-icon" href="${base}brand/apple-touch-icon.png" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${SITE.url}/brand/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${base}src/styles.css" />
  <script>try{if(sessionStorage.getItem('nmm-t')){document.documentElement.classList.add('is-arriving')}}catch(e){}</script>
</head>
<body class="${bodyClass}" data-base="${base}">
  <a class="skip" href="#main">Skip to content</a>
  <div class="curtain" id="curtain" aria-hidden="true"><span class="curtain__name">Nick Molina <em>Media</em></span></div>
  <header class="nav" id="nav">
    <a class="nav__brand" href="${base}index.html" aria-label="Nick Molina Media home">
      <img class="nav__logo nav__logo--light" src="${base}brand/lockup-light.png" alt="Nick Molina Media" width="1708" height="300" />
      <img class="nav__logo nav__logo--walnut" src="${base}brand/lockup-walnut.png" alt="" width="1708" height="300" />
    </a>
    <nav class="nav__links" aria-label="Primary">
      <a href="${base}work.html">Work</a>
      <a href="${base}portfolio.html">Portfolio</a>
      <a href="${base}builders.html">For Builders</a>
      <a href="${base}about.html">About</a>
    </nav>
    <a class="btn btn--blue nav__cta" href="${base}contact.html" data-magnetic>Book a shoot</a>
    <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="menu">
      <span></span><span></span>
    </button>
  </header>
  <div class="menu" id="menu" aria-hidden="true">
    <nav class="menu__links">
      <a href="${base}index.html">Home</a>
      <a href="${base}work.html">Work</a>
      <a href="${base}portfolio.html">Portfolio</a>
      <a href="${base}builders.html">For Builders</a>
      <a href="${base}about.html">About</a>
      <a href="${base}contact.html">Contact</a>
    </nav>
    <p class="menu__foot">Denver &middot; Front Range &middot; <a href="tel:${SITE.tel}">${SITE.phone}</a></p>
  </div>

  <div id="smooth-wrapper"><div id="smooth-content">
  <main id="main">
${body}
  </main>
  <footer class="footer">
    <div class="footer__top">
      <p class="footer__big">Your last job should<br /><em>sell your next one.</em></p>
      <a class="btn btn--blue btn--lg" href="${base}contact.html" data-magnetic>Book a project shoot</a>
    </div>
    <div class="footer__grid">
      <div>
        <img class="footer__logo" src="${base}brand/logo-light.png" alt="Nick Molina Media" width="1000" height="639" />
        <p class="muted">Cinematic video and photography for Colorado builders and remodelers. Denver metro and the Front Range.</p>
      </div>
      <nav class="footer__links" aria-label="Footer">
        <a href="${base}work.html">Work</a>
        <a href="${base}portfolio.html">Portfolio</a>
        <a href="${base}builders.html">For Builders</a>
        <a href="${base}about.html">About</a>
        <a href="${base}contact.html">Contact</a>
      </nav>
      <div class="footer__links">
        <a href="${SITE.instagram}" rel="noopener">Instagram</a>
        <a href="${SITE.facebook}" rel="noopener">Facebook</a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:${SITE.tel}">${SITE.phone}</a>
      </div>
    </div>
    <p class="footer__legal">&copy; ${new Date().getFullYear()} Nick Molina Media. Projects shown were built by Summit Custom Builders and filmed on site.</p>
  </footer>
  </div></div>

  <a class="mobile-cta" href="${base}contact.html">Book a shoot</a>

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
