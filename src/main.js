import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, Flip);
// iOS/Android browsers resize the viewport as the address bar hides; don't re-measure pins for that.
ScrollTrigger.config({ ignoreMobileResize: true });
// Local test hook (dev server only): ?y=<px> jumps to that scroll position after load so simulator screenshots can land mid-scene.
if (location.hostname === 'localhost') { const y = Number(new URLSearchParams(location.search).get('y')); if (y) window.addEventListener('load', () => setTimeout(() => window.scrollTo(0, y), 800)); }
window.__motion = { gsap, ScrollTrigger };
gsap.defaults({ ease: 'power3.out', duration: 0.8 });
gsap.config({ nullTargetWarn: false });

/* ---------- Motion tokens (see animation-forge + cinematic-scroll-storytelling) ---------- */
const T = {
  enter: 'power4.out',        // confident arrival
  morph: 'power3.inOut',      // in-place change
  exit: 'power2.in',          // departure
  text: 1.0, card: 1.0, section: 0.6, component: 0.35, micro: 0.16,
  wordStagger: 0.045, lineStagger: 0.1, cardStagger: 0.08,
  scrub: 0.9,
};

const mm = gsap.matchMedia();
const isTouch = ScrollTrigger.isTouch === 1;
// Phones flick fast: reveals start as soon as the element enters, run shorter, and complete on their own
// if the flick has already carried the element past the trigger (fastScrollEnd).
if (isTouch) { T.text = 0.7; T.card = 0.75; T.cardStagger = 0.07; }
const REVEAL_START = isTouch ? 'top 100%' : 'top 85%';
// Pinned scenes: desktop eases the scene behind the smooth scroller (scrub 0.9s). Phones have native momentum
// already, and a catch-up tween can be interrupted by a flick that overshoots the top and leave the scene
// half-rendered, so on touch the scene follows the scroll position directly and is rewound/finished outright
// whenever the scroll leaves it.
const SCENE_SCRUB = isTouch ? true : T.scrub;
const hardRewind = (self) => { if (isTouch) self.animation.progress(0); };
const hardFinish = (self) => { if (isTouch) self.animation.progress(1); };
// A flick on a phone moves thousands of pixels a second. Anything entering during one is shown at once
// instead of animated, so the page never looks empty while the scroll settles.
const flicking = (st) => Math.abs(st.getVelocity()) > 1800;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCE = '(prefers-reduced-motion: reduce)';
const DESK = '(min-width: 901px)';
const MOBILE = '(max-width: 900px)';
// Motion runs unless the person asked for reduced motion. Gating on "reduce" (not on
// "no-preference") keeps motion on in browsers that report neither value.
const reduce = window.matchMedia(REDUCE).matches;
const motion = (fn) => { if (!reduce) fn(); };
// Responsive scenes: matchMedia runs the callback when either matches; ctx.conditions.desk tells them apart.
const RESPONSIVE = { desk: DESK, mobile: MOBILE };
const responsive = (fn) => { if (!reduce) mm.add(RESPONSIVE, fn); };

/* ---------- Lazy video: load near the viewport, play only while visible ---------- */
const loadIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const v = e.target;
    if (v.dataset.poster && !v.poster) v.poster = v.dataset.poster;
    if (!v.src) { v.src = v.dataset.src; v.load(); }
    loadIO.unobserve(v);
  }
}, { rootMargin: '120% 0px' });
const playIO = new IntersectionObserver((entries) => {
  for (const e of entries) e.isIntersecting ? e.target.play?.().catch(() => {}) : e.target.pause?.();
}, { threshold: 0.05 });
$$('video[data-src]').forEach((v) => { loadIO.observe(v); playIO.observe(v); });

/* ---------- Hero video: pick the 9:16 or 16:9 cut, re-check on resize ---------- */
const heroVideo = $('#heroVideo');
if (heroVideo) {
  heroVideo.dataset.poster = heroVideo.poster;
  const pick = () => {
    const mobile = window.innerWidth < 700 && window.innerHeight > window.innerWidth;
    const want = mobile ? heroVideo.dataset.mobile : heroVideo.dataset.desktop;
    if (heroVideo.getAttribute('src') === want) return;
    heroVideo.src = want;
    heroVideo.poster = mobile ? heroVideo.dataset.mobilePoster : heroVideo.dataset.poster;
    heroVideo.load();
    heroVideo.play?.().catch(() => {});
  };
  pick();
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(pick, 250); });
}

// The three rooms sit right under the hero and must be ready the moment the hero lets go.
window.addEventListener('load', () => setTimeout(() => $$('#shift video').forEach((v) => { if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.load(); } }), 600));

/* ---------- Smooth scroll (pointer devices, motion allowed) ---------- */
if (!reduce) mm.add('(pointer: fine)', () => {
  if (isTouch) return;
  const smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.1, effects: false });
  return () => smoother.kill();
});

/* ---------- Nav: translucent after 40px, hides on scroll down, returns on scroll up ---------- */
const nav = $('#nav');
let lastY = 0;
let menuOpen = false;
ScrollTrigger.create({
  start: 0, end: 'max',
  onUpdate: (self) => {
    const y = self.scroll();
    nav.classList.toggle('is-scrolled', y > 40);
    nav.classList.toggle('is-hidden', y > 300 && y > lastY && !menuOpen);
    lastY = y;
  },
});
// A page can open already scrolled (hash link, restored scroll): set the nav state once without waiting for a scroll.
window.addEventListener('load', () => nav.classList.toggle('is-scrolled', (window.scrollY || 0) > 40));

/* ---------- Mobile menu (clip reveal, staggered links) ---------- */
const menu = $('#menu');
const toggle = $('#navToggle');
const menuTl = gsap.timeline({ paused: true })
  .set(menu, { visibility: 'visible' })
  .to(menu, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' })
  .to('.menu__links a', { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: T.enter }, '-=0.3');
toggle?.addEventListener('click', () => {
  menuOpen = !menuOpen;
  toggle.setAttribute('aria-expanded', String(menuOpen));
  menu.setAttribute('aria-hidden', String(!menuOpen));
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  menuOpen ? menuTl.play() : menuTl.reverse();
});

/* =====================================================================
   SCROLL SCENES — created in page order; pinned scenes carry a higher
   refreshPriority (GSAP refreshes higher numbers first) so their pin
   spacing is in place before anything below them is measured.
   ===================================================================== */

/* ---------- Hero: entrance, then shrink-to-card as the statement takes over ---------- */
const hero = $('#hero');
if (hero) {
  // Staged entrance: headline leads, support copy and CTAs follow (staging + follow-through)
  motion(() => {
    gsap.timeline({ delay: 0.1 })
      .to('#heroTitle .line > span', { y: 0, duration: 1.3, ease: T.enter, stagger: T.lineStagger })
      .to('.hero__content .fade-up', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: T.enter, stagger: 0.1 }, '-=0.8');
  });
  if (reduce) gsap.set('#heroTitle .line > span, .hero__content .fade-up', { y: 0, opacity: 1, filter: 'none' });
  $$('.hero__content .fade-up').forEach((el) => el.classList.remove('fade-up'));

  responsive((ctx) => {
    const { desk } = ctx.conditions;
    gsap.set('#heroMedia', { clipPath: 'inset(0% 0% 0% 0% round 0px)' });
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'hero', trigger: hero, start: 'top top', end: () => (desk ? '+=190%' : '+=150%'),
        pin: true, scrub: SCENE_SCRUB, anticipatePin: 1, refreshPriority: 3, invalidateOnRefresh: true,
        onLeaveBack: hardRewind, onLeave: hardFinish,
      },
    });
    tl.to('#heroContent', { opacity: 0, y: -80, duration: 0.3, ease: 'none' }, 0)
      .to('.hero__scroll', { opacity: 0, duration: 0.15, ease: 'none' }, 0)
      .to('#heroMedia', { clipPath: desk ? 'inset(16% 20% 16% 20% round 28px)' : 'inset(22% 8% 22% 8% round 22px)', duration: 0.7, ease: 'power2.inOut' }, 0.12)
      .to('#heroVideo', { scale: 1, duration: 0.7, ease: 'power2.inOut' }, 0.12)
      .to('#heroDim', { opacity: 1, duration: 0.3, ease: 'none' }, 0.3)
      .to('#heroStatement .w', { opacity: 1, y: 0, duration: 0.45, stagger: T.wordStagger, ease: 'none' }, 0.42)
      .to('#heroMedia', { yPercent: -6, duration: 0.3, ease: 'none' }, 0.75);
  });
  if (reduce) gsap.set('#heroStatement', { display: 'none' });
}

/* ---------- Shift: three rooms, three lines, one pinned scrub ---------- */
const shift = $('#shift');
if (shift) {
  const panels = $$('[data-panel]', shift);
  const lines = $$('[data-line]', shift);
  const counter = $('.shift__counter b', shift);
  const bar = $('.shift__bar i', shift);
  responsive((ctx) => {
    const { desk } = ctx.conditions;
    gsap.set(lines, { opacity: 0, y: 40 });
    const tl = gsap.timeline({
      scrollTrigger: {
        id: 'shift', trigger: shift, start: 'top top', end: () => (desk ? '+=280%' : '+=220%'),
        pin: true, scrub: SCENE_SCRUB, anticipatePin: 1, refreshPriority: 2, invalidateOnRefresh: true,
        onLeaveBack: hardRewind, onLeave: hardFinish,
        onUpdate: (self) => {
          counter.textContent = String(Math.min(2, Math.floor(self.progress * 3)) + 1).padStart(2, '0');
          gsap.set(bar, { scaleX: self.progress });
        },
      },
    });
    tl.to(lines[0], { opacity: 1, y: 0, duration: 0.5, ease: 'none' }, 0)
      .to(panels[0].querySelector('video,img'), { scale: 1.08, duration: 3, ease: 'none' }, 0)
      .to(lines[0], { opacity: 0, y: -40, duration: 0.4, ease: 'none' }, 0.9)
      .fromTo(panels[1], { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.6, ease: 'none' }, 0.9)
      .to(lines[1], { opacity: 1, y: 0, duration: 0.5, ease: 'none' }, 1.3)
      .to(lines[1], { opacity: 0, y: -40, duration: 0.4, ease: 'none' }, 1.95)
      .fromTo(panels[2], { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 0.6, ease: 'none' }, 1.95)
      .to(lines[2], { opacity: 1, y: 0, duration: 0.5, ease: 'none' }, 2.35)
      .to({}, { duration: 0.5 });
  });
  if (reduce) {
    // Static fallback: show the last room and the last line, no pin.
    gsap.set(panels.slice(1), { clipPath: 'inset(0 0 0 0)' });
    gsap.set(lines.slice(0, 2), { display: 'none' });
    gsap.set(lines[2], { opacity: 1, y: 0 });
  }
}

/* ---------- Steps: rule draws in, numbers count up ---------- */
$$('[data-step]').forEach((el, i) => {
  ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => setTimeout(() => el.classList.add('is-on'), i * 160) });
});
$$('[data-count]').forEach((el) => {
  const to = Number(el.dataset.count);
  ScrollTrigger.create({
    trigger: el, start: 'top 90%', once: true,
    onEnter: () => gsap.fromTo(el, { innerText: 0 }, { innerText: to, duration: 1.2, ease: 'power2.out', snap: { innerText: 1 } }),
  });
});

/* ---------- Work strip: vertical scroll drives horizontal travel (every device) ---------- */
const track = $('#workTrack');
if (track) {
  motion(() => {
    const dist = () => track.scrollWidth - window.innerWidth + parseFloat(getComputedStyle(track).paddingLeft) * 2;
    const travel = gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: {
        id: 'work', trigger: '.work-strip', start: 'top top', end: () => '+=' + dist(),
        pin: '.work-strip__pin', scrub: SCENE_SCRUB, invalidateOnRefresh: true, anticipatePin: 1, refreshPriority: 1,
      },
    });
    // Depth: media inside each card drifts against the strip's travel (containerAnimation).
    $$('.card', track).forEach((card) => {
      const media = card.querySelector('video, img'); if (!media) return;
      gsap.fromTo(media, { xPercent: -7 }, { xPercent: 7, ease: 'none', scrollTrigger: { containerAnimation: travel, trigger: card, start: 'left right', end: 'right left', scrub: true } });
    });
  });
}

/* ---------- Sticky card stack: earlier cards recede as the next arrives ---------- */
const cards = $$('.stack-card');
if (cards.length) {
  motion(() => {
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.92 + i * 0.015, autoAlpha: 0.72, y: -24, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top 78%', end: 'top 24%', scrub: 0.6, invalidateOnRefresh: true },
      });
    });
  });
}

/* ---------- Marquee: linear loop, speeds up with scroll velocity ---------- */
const marquee = $('#marquee');
if (marquee) {
  motion(() => {
    const loop = gsap.to(marquee, { xPercent: -50, duration: 26, ease: 'none', repeat: -1 });
    const st = ScrollTrigger.create({
      onUpdate: (self) => gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(self.getVelocity()) / 500, 4), duration: 0.5, overwrite: true }),
    });
    return () => { loop.kill(); st.kill(); };
  });
}

/* ---------- Parallax: small distances, halved on mobile ---------- */
$$('[data-parallax]').forEach((el) => {
  const p = Number(el.dataset.parallax) * 100;
  responsive((ctx) => {
    const amt = ctx.conditions.desk ? p : p * 0.7;
    gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true } });
  });
});

/* ---------- Media drift: card media slides against the scroll (depth without a pin) ---------- */
motion(() => {
  const media = $$('.who__bg, .stack-card__media > video, .stack-card__media > img, .work-grid .card video, .work-grid .card img, .step--media video, .reels__phone video, .site-banner video');
  media.forEach((m) => {
    const box = m.parentElement; if (!box) return;
    gsap.set(m, { scale: 1.16, transformOrigin: 'center' });
    gsap.fromTo(m, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: box, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true } });
  });
});

/* ---------- Footer: slow upward handoff ---------- */
const footer = $('.footer');
if (footer) {
  motion(() => {
    gsap.fromTo(footer, { yPercent: -8, autoAlpha: 0.85 }, { yPercent: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: footer, start: 'top bottom', end: 'top 45%', scrub: 1 } });
  });
}

/* ---------- Slide-over sections: each section lands on the last with a rounded edge; the one beneath recedes ---------- */
const slideOvers = $$('main > section').filter((sec) => sec.previousElementSibling && !sec.classList.contains('hero') && !sec.classList.contains('shift'));
slideOvers.forEach((sec) => sec.classList.add('slide-over'));
motion(() => {
  slideOvers.forEach((sec) => {
    const prev = sec.previousElementSibling;
    // Never transform a pin-spacer: on touch devices pins are position: fixed, and a transformed parent breaks them.
    if (!prev || prev.matches('.hero, .shift, .work-strip, .stack, .marquee, .pin-spacer')) return;
    gsap.to(prev, {
      scale: 0.96, autoAlpha: 0.55, transformOrigin: 'center bottom', ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 35%', scrub: 0.6, invalidateOnRefresh: true },
    });
  });
});

/* ---------- Clip reveals: media wipes open from the top while easing out of a push-in ---------- */
motion(() => {
  $$('[data-reveal-clip]').forEach((el) => {
    const media = el.querySelector('video, img') || el;
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)' });
    gsap.set(media, { scale: 1.18 });
    ScrollTrigger.create({
      trigger: el, start: isTouch ? 'top 96%' : 'top 82%', once: true, fastScrollEnd: true,
      onEnter: (self) => flicking(self)
        ? gsap.set([el, media], { clipPath: 'inset(0 0 0% 0)', scale: 1 })
        : gsap.timeline()
          .to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power4.inOut' })
          .to(media, { scale: 1, duration: 1.8, ease: T.enter }, 0.1),
    });
  });
});
if (reduce) $$('[data-reveal-clip]').forEach((el) => gsap.set(el, { clearProps: 'clipPath' }));

/* ---------- Closing call: slow push-in on the background as it arrives ---------- */
motion(() => {
  $$('.cta__bg').forEach((bg) => {
    gsap.fromTo(bg, { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: bg.parentElement, start: 'top bottom', end: 'top top', scrub: 1 } });
  });
});

/* ---------- Hero drift: the frame follows the pointer a few pixels (desktop) ---------- */
if (!reduce) mm.add('(pointer: fine)', () => {
  const hv = $('#heroVideo'); const h = $('#hero'); if (!hv || !h) return;
  const toX = gsap.quickTo(hv, 'x', { duration: 1.2, ease: 'power3.out' });
  const toY = gsap.quickTo(hv, 'y', { duration: 1.2, ease: 'power3.out' });
  const move = (e) => { const r = h.getBoundingClientRect(); toX(((e.clientX - r.left) / r.width - 0.5) * 24); toY(((e.clientY - r.top) / r.height - 0.5) * 16); };
  h.addEventListener('mousemove', move);
  return () => h.removeEventListener('mousemove', move);
});

/* ---------- Curtain page transitions ---------- */
const curtain = $('#curtain');
if (curtain) {
  const arriving = document.documentElement.classList.contains('is-arriving');
  try { sessionStorage.removeItem('nmm-t'); } catch {}
  if (arriving && !reduce) {
    gsap.set(curtain, { yPercent: 0 });
    gsap.timeline({ onComplete: () => document.documentElement.classList.remove('is-arriving') })
      .to('.curtain__name', { opacity: 0, y: -10, duration: 0.3, ease: T.exit }, 0.1)
      .to(curtain, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, 0.15);
  } else {
    document.documentElement.classList.remove('is-arriving');
    gsap.set(curtain, { yPercent: 100 });
  }
  if (!reduce) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]'); if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) { const target = document.querySelector(url.hash); if (target) { e.preventDefault(); const y = target.getBoundingClientRect().top + (window.scrollY || 0) - 20; (ScrollSmoother.get() ? ScrollSmoother.get().scrollTo(target, true, 'top 20px') : window.scrollTo({ top: y, behavior: 'smooth' })); } return; }
      if (!/\.html$|\/$/.test(url.pathname)) return;
      e.preventDefault();
      try { sessionStorage.setItem('nmm-t', '1'); } catch {}
      gsap.set('.curtain__name', { opacity: 0, y: 10 });
      gsap.timeline({ onComplete: () => { location.href = url.href; } })
        .fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'power4.inOut' })
        .to('.curtain__name', { opacity: 1, y: 0, duration: 0.35, ease: T.enter }, '-=0.25');
    });
  }
}

/* ---------- Portfolio: parallax walls, chapter words, hero mosaic, tile lightbox ---------- */
if ($('.is-portfolio') || document.body.classList.contains('is-portfolio')) {
  // Phones and tablets: re-pack every wall into two level columns (three for the reels wall) so the
  // columns can drift against each other the way they do on desktop, with no holes beside tall reels.
  if (window.matchMedia(MOBILE).matches) $$('[data-wall]').forEach((w) => {
    const tiles = $$('.tile', w);
    const n = w.classList.contains('wall--5') || w.classList.contains('wall--6') ? 3 : 2;
    const speeds = [-40, 26, -34];
    const cols = Array.from({ length: n }, (_, i) => { const c = document.createElement('div'); c.className = 'wall__col'; c.dataset.col = ''; c.dataset.speed = String(speeds[i]); return c; });
    const h = Array(n).fill(0);
    tiles.forEach((t) => { const i = h.indexOf(Math.min(...h)); cols[i].appendChild(t); h[i] += t.classList.contains('tile--v') ? 1.78 : 0.5625; });
    w.replaceChildren(...cols);
  });
  responsive((ctx) => {
    $$('[data-wall]').forEach((w) => {
      $$('[data-col]', w).forEach((col) => {
        const speed = Number(col.dataset.speed);
        gsap.fromTo(col, { y: -speed }, { y: speed, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true } });
      });
    });
    $$('[data-chapter]').forEach((ch) => {
      const word = $('[data-chapter-word]', ch); const bg = $('[data-chapter-bg]', ch);
      gsap.fromTo(word, { xPercent: 12 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: ch, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.fromTo(bg, { scale: 1.18, yPercent: -8 }, { scale: 1, yPercent: 8, ease: 'none', scrollTrigger: { trigger: ch, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });
    $$('.pf-hero__cell').forEach((cell) => {
      const d = Number(cell.dataset.depth);
      gsap.to(cell, { yPercent: -18 * d, ease: 'none', scrollTrigger: { trigger: '#pfHero', start: 'top top', end: 'bottom top', scrub: 0.8 } });
    });
  });
  if (!reduce) mm.add('(pointer: fine)', () => {
    const hero = $('#pfHero'); if (!hero) return;
    const cells = $$('.pf-hero__cell').map((c) => ({ el: c, d: Number(c.dataset.depth), x: gsap.quickTo(c, 'x', { duration: 1.4, ease: 'power3.out' }), y: gsap.quickTo(c, 'y', { duration: 1.4, ease: 'power3.out' }) }));
    const move = (e) => { const r = hero.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; cells.forEach((c) => { c.x(px * -22 * c.d); c.y(py * -14 * c.d); }); };
    hero.addEventListener('mousemove', move);
    return () => hero.removeEventListener('mousemove', move);
  });
  // Tile lightbox: reuse the film modal with a looping clip
  $$('[data-clip]').forEach((b) => b.addEventListener('click', () => {
    const v = $('#filmVideo'); v.loop = true; v.src = './media/clips/' + b.dataset.clip + '.mp4';
    const mod = $('#filmModal'); mod.classList.add('is-open'); mod.setAttribute('aria-hidden', 'false');
    mod.classList.toggle('modal--v', b.classList.contains('tile--v'));
    gsap.fromTo('.modal__body', { scale: 0.96, y: 16 }, { scale: 1, y: 0, duration: 0.5, ease: T.enter });
    v.play().catch(() => {});
  }));
}

/* ---------- Generic reveals: masked lines, blur-in blocks. Play once. ---------- */
motion(() => {
  $$('.reveal-lines').forEach((el) => {
    const spans = $$('.line > span', el);
    ScrollTrigger.create({
      trigger: el, start: REVEAL_START, once: true, fastScrollEnd: true,
      onEnter: (self) => flicking(self) ? gsap.set(spans, { y: 0 }) : gsap.to(spans, { y: 0, duration: T.text, ease: T.enter, stagger: T.lineStagger }),
    });
  });
  const shown = (els) => { els.forEach((el) => el.classList.remove('fade-up')); gsap.set(els, { clearProps: 'opacity,transform,filter' }); };
  ScrollTrigger.batch('.fade-up', {
    start: isTouch ? 'top 100%' : 'top 90%', once: true, interval: 0.1, batchMax: 6, fastScrollEnd: true,
    onEnter: (els, triggers) => (triggers[0] && flicking(triggers[0])) ? shown(els) : gsap.to(els, {
      opacity: 1, y: 0, filter: 'blur(0px)', duration: T.text, ease: T.enter, stagger: T.cardStagger, overwrite: true,
      onComplete: () => shown(els),
    }),
  });
  // Work grid: one staged entrance, then Flip owns the cards' opacity and position.
  const grid = $('#workGrid');
  if (grid) {
    ScrollTrigger.create({
      trigger: grid, start: REVEAL_START, once: true, fastScrollEnd: true,
      onEnter: (self) => { if (!flicking(self)) gsap.from($$('.card', grid), { y: 40, autoAlpha: 0, duration: T.card, ease: T.enter, stagger: { each: T.cardStagger, grid: 'auto', from: 'start' }, clearProps: 'all' }); },
    });
  }
});
if (reduce) gsap.set('.fade-up, .reveal-lines .line > span', { opacity: 1, y: 0, filter: 'none', clearProps: 'filter' });

/* =====================================================================
   INTERACTION
   ===================================================================== */

/* ---------- FAQ accordion ---------- */
$$('.faq__item').forEach((item) => {
  const q = $('.faq__q', item), a = $('.faq__a', item);
  q.addEventListener('click', () => {
    const open = item.classList.toggle('is-open');
    q.setAttribute('aria-expanded', String(open));
    gsap.to(a, { height: open ? 'auto' : 0, duration: open ? 0.55 : 0.4, ease: open ? T.morph : T.exit, onComplete: () => ScrollTrigger.refresh() });
  });
});

/* ---------- Work filters: Flip keeps every card's journey continuous ---------- */
const filters = $('#filters');
if (filters) {
  const grid = $('#workGrid');
  filters.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b || b.classList.contains('is-active')) return;
    $$('button', filters).forEach((x) => x.classList.toggle('is-active', x === b));
    const f = b.dataset.filter;
    const items = $$('.card', grid);
    const state = Flip.getState(items);
    items.forEach((c) => c.classList.toggle('is-hidden', f !== 'all' && c.dataset.filter !== f));
    Flip.from(state, {
      duration: 0.8, ease: T.morph, stagger: 0.03, absolute: true, nested: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.96, filter: 'blur(6px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: T.enter, clearProps: 'filter' }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.96, duration: 0.35, ease: T.exit }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  });
}

/* ---------- Film modal ---------- */
const modal = $('#filmModal'), filmVideo = $('#filmVideo');
$$('[data-film]').forEach((b) => b.addEventListener('click', () => {
  filmVideo.src = b.dataset.film;
  modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
  gsap.fromTo('.modal__body', { scale: 0.96, y: 16 }, { scale: 1, y: 0, duration: 0.5, ease: T.enter });
  filmVideo.play().catch(() => {});
}));
const closeModal = () => {
  gsap.to('.modal__body', { scale: 0.97, y: 10, duration: 0.25, ease: T.exit });
  modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
  filmVideo.pause(); filmVideo.removeAttribute('src'); filmVideo.load();
};
$('#filmClose')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

/* ---------- Buttons: magnetic pull on hover, squash on press ---------- */
if (!reduce) mm.add('(pointer: fine)', () => {
  $$('[data-magnetic]').forEach((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.5, ease: T.enter });
    };
    const leave = () => gsap.to(el, { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.6, ease: 'power3.out' });
    const down = () => gsap.to(el, { scaleY: 0.95, scaleX: 1.02, duration: T.micro, ease: T.exit });
    const up = () => gsap.to(el, { scaleY: 1, scaleX: 1, duration: 0.3, ease: 'back.out(2)' });
    el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
    el.addEventListener('mousedown', down); el.addEventListener('mouseup', up);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); el.removeEventListener('mousedown', down); el.removeEventListener('mouseup', up); };
  });
});

/* ---------- Contact form ---------- */
const form = $('#shootForm');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = $('button[type=submit]', form); btn.disabled = true; btn.textContent = 'Sending…';
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error('send failed');
    const ok = $('#formOk'); ok.style.display = 'block';
    gsap.from(ok, { y: 12, opacity: 0, duration: 0.5, ease: T.enter });
    form.reset(); btn.textContent = 'Sent';
  } catch { btn.disabled = false; btn.textContent = 'Try again'; }
});

/* ---------- Refresh once fonts and media have settled ---------- */
window.addEventListener('load', () => ScrollTrigger.refresh());
document.fonts?.ready.then(() => ScrollTrigger.refresh());
