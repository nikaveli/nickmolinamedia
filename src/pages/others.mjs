import { video, SITE } from '../templates/layout.mjs';

const steps = `
<section class="section steps">
  <div class="wrap">
    <p class="eyebrow fade-up">How it works</p>
    <h2 class="display d-2 reveal-lines" style="margin-top:24px; max-width: 14ch"><span class="line"><span>One visit.</span></span><span class="line"><span>Everything you need.</span></span></h2>
    <div class="steps__list">
      <div class="step" data-step><div class="step__num">01</div><h3>Tell me when it's done.</h3><p>Send the address and a time window around final walkthrough.</p></div>
      <div class="step" data-step><div class="step__num">02</div><h3>I show up and film.</h3><p>Me, not a crew. About [2 to 3 hours] on site, no disruption to your homeowner.</p></div>
      <div class="step" data-step><div class="step__num">03</div><h3>You get the full set.</h3><p>A project film, vertical reels, and edited photos in [7 days].</p></div>
    </div>
  </div>
</section>`;

const closing = (eyebrow = 'Got a project wrapping up?') => `
<section class="cta">
  <div class="cta__bg" data-parallax="0.2">${video('p-teal-bath.mp4', { poster: 'p-teal-bath.jpg' })}</div>
  <div class="cta__in">
    <p class="eyebrow fade-up" style="justify-content:center">${eyebrow}</p>
    <h2 class="display d-1 reveal-lines" style="margin-top:24px"><span class="line"><span>Tell me where</span></span><span class="line"><span>and when.</span></span></h2>
    <p class="lead fade-up" style="margin: 24px auto 0; text-align:center">Send the address and a time window. I'll take it from there.</p>
    <a class="btn btn--blue btn--lg fade-up" href="./contact" data-magnetic>Book a project shoot</a>
    <p class="cta__phone fade-up">Or call or text <a href="tel:${SITE.tel}">${SITE.phone}</a></p>
  </div>
</section>`;

export function work(projects) {
  const cards = projects.map((p) => `
    <a class="card" href="./work/${p.slug}" data-filter="${p.filter}">
      ${video(p.loop + '.mp4', { poster: p.loop + '.jpg' })}
      <div class="card__meta"><h3>${p.title}</h3><span>${p.room} &middot; ${p.city}</span></div>
    </a>`).join('');
  return `
<section class="page-hero light">
  <div class="wrap">
    <p class="eyebrow fade-up">Work</p>
    <h1 class="display d-1 reveal-lines" style="margin-top:24px"><span class="line"><span>The work.</span></span></h1>
    <p class="lead fade-up">${projects.length} finished projects from one Denver builder, Summit Custom Builders, every one filmed on site in a single visit. This is what your next homeowner would see.</p>
    <div class="filters fade-up" id="filters">
      <button class="is-active" data-filter="all">All</button>
      <button data-filter="kitchens">Kitchens</button>
      <button data-filter="baths">Baths</button>
      <button data-filter="additions">Additions</button>
      <button data-filter="whole">Whole home</button>
    </div>
  </div>
</section>
<section class="light"><div class="wrap work-grid" id="workGrid">${cards}</div></section>
<section class="section reels">
  <div class="wrap">
    <div class="grid-2" style="align-items:end">
      <div><h2 class="display d-2 reveal-lines"><span class="line"><span>Cut for the feed.</span></span></h2></div>
      <p class="lead fade-up">Every project also comes back as vertical reels, five to six seconds each, with the hook in the first two. These are the ones Summit posts.</p>
      <a class="btn btn--ghost fade-up" href="./portfolio" data-magnetic>Open the full portfolio <span class="arrow">&rarr;</span></a>
    </div>
    <div class="phones" data-phones>
      ${['u033', 'u048', 'u045', 'u037', 'u036', 'u039', 'u030', 'u034'].map((id) => `<div class="phone"><video muted playsinline loop preload="metadata" data-src="./media/clips/${id}.mp4" poster="./media/clips/${id}.jpg" aria-label="Vertical reel"></video></div>`).join('')}
    </div>
  </div>
</section>
<section class="section" style="padding-top:0; padding-bottom:0">
  <div class="wrap" style="padding-top: clamp(64px, 10vw, 140px)">
    <div class="grid-2" style="align-items:end">
      <div>
        <p class="eyebrow fade-up">The film</p>
        <h2 class="display d-2 reveal-lines" style="margin-top:24px"><span class="line"><span>Summit Custom</span></span><span class="line"><span>Builders, on film.</span></span></h2>
      </div>
      <p class="lead fade-up">Sixty seconds across kitchens, baths, and an addition. This is what one builder's work looks like when it's filmed properly, and what yours could look like by the next walkthrough.</p>
    </div>
    <div class="film-frame" data-reveal-clip style="margin-top:48px">
      <img src="./media/film-summit1.jpg" alt="" loading="lazy" />
      <button class="film-frame__play" data-film="./media/film-summit1.mp4" aria-label="Play the Summit Custom Builders film"><span>PLAY</span></button>
    </div>
  </div>
</section>
${closing('Want your work filmed like this?')}`;
}

export function builders() {
  return `
<section class="page-hero light">
  <div class="wrap grid-2" style="align-items:end">
    <div>
      <p class="eyebrow fade-up">For builders</p>
      <h1 class="display d-1 reveal-lines" style="margin-top:24px"><span class="line"><span>Video for builders</span></span><span class="line"><span>too busy</span></span><span class="line"><span>to market.</span></span></h1>
    </div>
    <div>
      <p class="lead fade-up">Flat prices, no contract, and you own every file. One visit, one whole project, or a monthly rhythm. For remodelers, custom home builders, design-build firms, kitchen and bath specialists, and the trades behind them.</p>
    </div>
  </div>
</section>
<section class="section light" style="padding-top:0">
  <div class="wrap">
    <div class="who__grid">
      <a class="who__card fade-up" href="./contact"><h3>Custom home builders</h3><p>Whole homes, filmed at the finish and along the way.</p></a>
      <a class="who__card fade-up" href="./contact"><h3>Remodelers and design-build</h3><p>Whole-home and main-level remodels with a real before.</p></a>
      <a class="who__card fade-up" href="./contact"><h3>Kitchen and bath specialists</h3><p>The rooms homeowners search for first, and judge hardest.</p></a>
      <a class="who__card fade-up" href="./contact"><h3>Additions and ADUs</h3><p>Framing to finish, the transformation homeowners want to see.</p></a>
      <a class="who__card fade-up" href="./contact"><h3>Outdoor living and pools</h3><p>Decks, patios, and backyards that sell best at dusk.</p></a>
      <a class="who__card fade-up" href="./contact"><h3>The trades behind them</h3><p>Cabinets, tile, counters, framing. Licensed footage of your part of the job.</p></a>
    </div>
  </div>
</section>
<section class="section light packages" style="padding-top:0">
  <div class="wrap">
    <h2 class="display d-2 reveal-lines" style="margin:0 0 48px"><span class="line"><span>Three packages,</span></span><span class="line"><span>one for each kind of job.</span></span></h2>
    <div class="packages__grid">
      <div class="pkg fade-up">
        <div class="pkg__tag">One visit</div>
        <h3>Project Film</h3>
        <div class="pkg__price"><strong>$950</strong>per finished project &middot; $750 for your first</div>
        <ul><li>45 to 60 second cinematic project film</li><li>Three vertical reels for Instagram and Facebook</li><li>20+ edited photos, wide to detail</li><li>Delivered in [7 days]</li></ul>
        <a class="btn btn--blue" href="./contact">Book a project shoot</a>
      </div>
      <div class="pkg pkg--hero fade-up">
        <div class="pkg__tag">One project, three visits</div>
        <h3>Build Story</h3>
        <div class="pkg__price"><strong>$1,900</strong>per project &middot; before, during, reveal</div>
        <ul><li>Visit one: the before, same angles you'll see again at the end</li><li>Middle visit: framing, tile day, or cabinet install</li><li>Final visit: the reveal</li><li>Before-and-after film, project film, six reels, 30+ photos</li></ul>
        <a class="btn btn--ghost" href="./contact">Book a Build Story</a>
      </div>
      <div class="pkg fade-up">
        <div class="pkg__tag">Every month</div>
        <h3>Builder Film Plan</h3>
        <div class="pkg__price"><strong>$1,200</strong>per month &middot; six-month plan</div>
        <ul><li>One finished-project film shoot a month</li><li>One in-progress visit a month</li><li>Reels and photos posted to your Google Business Profile</li><li>Your feeds stay current while the reveals are months out</li></ul>
        <a class="btn btn--ghost" href="./contact">Talk about the plan</a>
      </div>
    </div>
    <div class="site-banner fade-up">
      <div>
        <p class="eyebrow">The upgrade</p>
        <h3 class="display d-4" style="margin-top:12px">Signature Website, built around your footage.</h3>
        <p class="muted" style="margin-top:10px; max-width:60ch">A cinematic home page and a project page for every job we film, built by me so the film and the site are made for each other. From $2,500.</p>
      </div>
      <a class="btn btn--blue" href="./contact" data-magnetic>Ask about a site</a>
    </div>
    <div class="grid-2 grid-2--3" style="margin-top:64px">
      <div class="fade-up"><h3 class="display d-4">Founding builder intro</h3><p class="muted" style="margin-top:12px">First five builders get the intro price in exchange for a Google review and permission to feature the project.</p></div>
      <div class="fade-up"><h3 class="display d-4">Trade partner licensing</h3><p class="muted" style="margin-top:12px">The cabinet shop, tile setter, and fabricator on a job each want footage of their part. With your okay, I license it to each of them, so your trades get marketing too.</p></div>
      <div class="fade-up"><h3 class="display d-4">AI in the edit</h3><p class="muted" style="margin-top:12px">I use AI tools in the editing room where they save time: cleanup, color, and the tedious parts. Your work is never generated or altered. What's on screen was built by you and filmed on site.</p></div>
    </div>
  </div>
</section>
<section class="section steps">
  <div class="wrap">
    <p class="eyebrow fade-up">The Build Story</p>
    <h2 class="display d-2 reveal-lines" style="margin-top:24px; max-width: 16ch"><span class="line"><span>Three visits</span></span><span class="line"><span>across one project.</span></span></h2>
    <div class="steps__list">
      <div class="step step--media" data-step><div class="step__media" data-reveal-clip><video muted playsinline loop preload="metadata" data-src="./media/clips/u150.mp4" poster="./media/clips/u150.jpg" aria-hidden="true"></video></div><div class="step__num">01</div><h3>The before.</h3><p>Demo day or the empty shell, shot from the exact angles you'll see again at the end. This is the half of the before-and-after most builders never capture.</p></div>
      <div class="step step--media" data-step><div class="step__media" data-reveal-clip><video muted playsinline loop preload="metadata" data-src="./media/clips/u152.mp4" poster="./media/clips/u152.jpg" aria-hidden="true"></video></div><div class="step__num">02</div><h3>The middle.</h3><p>Framing, tile going in, cabinet install. Craft the homeowner never sees once the walls close. Reels go out while the job is live.</p></div>
      <div class="step step--media" data-step><div class="step__media" data-reveal-clip><video muted playsinline loop preload="metadata" data-src="./media/clips/u081.mp4" poster="./media/clips/u081.jpg" aria-hidden="true"></video></div><div class="step__num">03</div><h3>The reveal.</h3><p>Final walkthrough week, before furniture and daily life move in. The project film, the before-and-after cut, the photo set.</p></div>
    </div>
    <p class="muted fade-up" style="margin-top:40px; max-width:60ch">Single-visit Project Films follow the same final-visit standard. Delivery: reels in [3 business days], photo sets in [5], films within [two weeks] of the last visit.</p>
  </div>
</section>
<section class="section light">
  <div class="wrap grid-2">
    <div class="sticky">
      <p class="eyebrow fade-up">Objections</p>
      <h2 class="display d-3 reveal-lines" style="margin-top:24px"><span class="line"><span>What builders say,</span></span><span class="line"><span>and what I say back.</span></span></h2>
    </div>
    <div class="faq__list" id="faq">
      <div class="faq__item"><button class="faq__q" aria-expanded="false">"All my work comes from referrals." <span class="plus"></span></button><div class="faq__a"><p>Every referral looks you up before they call. What they find decides whether they do.</p></div></div>
      <div class="faq__item"><button class="faq__q" aria-expanded="false">"I take photos on my phone." <span class="plus"></span></button><div class="faq__a"><p>Phone photos record a job. They don't sell a six-figure kitchen. Film does.</p></div></div>
      <div class="faq__item"><button class="faq__q" aria-expanded="false">"I've been burned by marketing companies." <span class="plus"></span></button><div class="faq__a"><p>No contract, no retainer, no account manager. One project, one flat price, and the files are yours.</p></div></div>
      <div class="faq__item"><button class="faq__q" aria-expanded="false">"I don't have time." <span class="plus"></span></button><div class="faq__a"><p>Send me an address and a time window. I handle everything else. You keep building.</p></div></div>
      <div class="faq__item"><button class="faq__q" aria-expanded="false">"The homeowner already moved in." <span class="plus"></span></button><div class="faq__a"><p>Lived-in homes still film well. The best window is the week of final walkthrough, so call me before the next one wraps.</p></div></div>
      <div class="faq__item"><button class="faq__q" aria-expanded="false">"Video is expensive." <span class="plus"></span></button><div class="faq__a"><p>One project film costs less than one lost bid. It runs on your site and in your estimates for years.</p></div></div>
      <div class="faq__item"><button class="faq__q" aria-expanded="false">"I'm not on social media." <span class="plus"></span></button><div class="faq__a"><p>Most of what I deliver goes on your website and your Google profile, where homeowners look you up. Social is the bonus.</p></div></div>
    </div>
  </div>
</section>
${closing()}`;
}

export function about() {
  return `
<section class="page-hero light">
  <div class="wrap">
    <p class="eyebrow fade-up">About</p>
    <h1 class="display d-1 reveal-lines" style="margin-top:24px"><span class="line"><span>I'm Nick.</span></span><span class="line"><span>I show up.</span></span></h1>
  </div>
</section>
<section class="section light" style="padding-top:0">
  <div class="wrap grid-2">
    <div class="why__portrait why__portrait--photo" data-reveal-clip data-parallax="0.1"><img src="./media/nick.jpg" srcset="./media/nick-640.jpg 640w, ./media/nick.jpg 1024w" sizes="(max-width: 900px) 100vw, 50vw" width="1024" height="1536" alt="Nick Molina" decoding="async"></div>
    <div>
      <p class="lead fade-up">I've been a photographer since 2003. Five years ago a friend asked me to shoot the remodels he was building at Summit Custom Builders, and I've been on his job sites ever since. Somewhere in those years it stopped being a favor and became the work I wanted to do.</p>
      <p class="lead fade-up" style="margin-top:24px">I added video because photos couldn't carry what it feels like to walk through a finished home. Now I film every project myself, from the first walkthrough to the final edit.</p>
      <p class="lead fade-up" style="margin-top:24px">The craftsmanship is already there when I arrive. My job is to make sure the next homeowner sees it.</p>
      <p class="fade-up muted" style="margin-top:24px">Based in Denver. Working the Front Range only, so I can always be there in person.</p>
      <div class="why__kit fade-up"><ul><li>Cinema cameras</li><li>Gimbal and motorized slider</li><li>Google Local Guide, Level 7</li><li>Websites since the early 2000s</li></ul></div>
    </div>
  </div>
</section>
${steps}
${closing()}`;
}

export function contact() {
  return `
<section class="page-hero light">
  <div class="wrap">
    <p class="eyebrow fade-up">Contact</p>
    <h1 class="display d-1 reveal-lines" style="margin-top:24px"><span class="line"><span>Got a project</span></span><span class="line"><span>wrapping up?</span></span></h1>
    <p class="lead fade-up">Tell me where and when. I'll get back to you [within one business day].</p>
  </div>
</section>
<section class="section light" style="padding-top:0">
  <div class="wrap grid-2">
    <form class="form fade-up" id="shootForm" action="https://formspree.io/f/REPLACE_ME" method="POST">
      <label>Name<input name="name" required autocomplete="name" /></label>
      <label>Company<input name="company" autocomplete="organization" /></label>
      <label>Phone<input name="phone" type="tel" required autocomplete="tel" /></label>
      <label>Email<input name="email" type="email" autocomplete="email" /></label>
      <label>Project type<select name="project"><option>Kitchen</option><option>Bath</option><option>Addition</option><option>Whole home</option><option>Custom home</option><option>Other</option></select></label>
      <label>City<input name="city" /></label>
      <label class="full">Expected finish date<input name="finish" type="date" /></label>
      <label class="full">Anything else<textarea name="notes" rows="4"></textarea></label>
      <button class="btn btn--blue btn--lg" type="submit">Request a shoot</button>
      <p class="full muted" style="margin:0; font-size:14px; text-align:center">No contract. Flat price. You own every file.</p>
      <div class="form__ok full" id="formOk">Got it. I'll call or text you [within one business day] to lock in a date.</div>
    </form>
    <aside class="contact-aside">
      <div class="fade-up"><p class="eyebrow">Call or text</p><a href="tel:${SITE.tel}">${SITE.phone}</a></div>
      <div class="fade-up"><p class="eyebrow">Email</p><a href="mailto:${SITE.email}">${SITE.email}</a></div>
      <div class="fade-up"><p class="eyebrow">Where</p><p class="lead">Denver metro and the Front Range.</p></div>
      <div class="fade-up"><p class="eyebrow">Best time to book</p><p class="lead">A week or two before final walkthrough, while the home is still empty.</p></div>
    </aside>
  </div>
</section>`;
}

export function project(p, projects) {
  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];
  const clipTiles = (p.clips || []).map((id, k) => `<figure class="clip-tile" data-reveal-clip><video muted playsinline loop preload="metadata" data-src="../media/clips/${id}.mp4" poster="../media/clips/${id}.jpg" aria-label="${p.title}, clip ${k + 1}"></video></figure>`).join('');
  const gallery = clipTiles + Array.from({ length: p.photos }, (_, k) => {
    const n = String(k + 1).padStart(2, '0');
    return `<figure data-reveal-clip><img src="../media/photos/${p.slug}-${n}.jpg" alt="${p.title}, photo ${k + 1}" loading="lazy" /></figure>`;
  }).join('');
  const details = p.details.map((d, k) => `<div class="detail fade-up"><b>0${k + 1}</b>${d}</div>`).join('');
  const headline = {
    Addition: ['An addition,', 'filmed during the build and at the finish.'],
    'Whole home': ['A whole home,', 'filmed room by room in one visit.'],
  }[p.room] || [`${p.room} remodel,`, 'filmed in one visit.'];
  return `
<section class="project-hero">
  ${video(p.loop + '.mp4', { poster: p.loop + '.jpg', base: '../' })}
  <div class="project-hero__shade"></div>
  <div class="project-hero__copy">
    <div>
      <p class="eyebrow">${p.room} &middot; ${p.city}</p>
      <h1 class="display d-1" style="margin-top:16px">${p.title}</h1>
    </div>
    <p class="credit">Built by <a href="https://summitcustombuilders.net" rel="noopener" style="text-decoration:underline">Summit Custom Builders</a> &middot; Filmed by Nick Molina Media</p>
  </div>
</section>
<section class="section light" style="padding-bottom:0">
  <div class="wrap grid-2">
    <div><p class="eyebrow fade-up">The project</p><h2 class="display d-3 reveal-lines" style="margin-top:20px"><span class="line"><span>${headline[0]}</span></span><span class="line"><span>${headline[1]}</span></span></h2></div>
    <div><p class="lead fade-up">${p.blurb}</p><p class="muted fade-up" style="margin-top:16px">[Two or three sentences from Summit on what was built go here.]</p></div>
  </div>
  <div class="wrap project-film" style="padding-left:0; padding-right:0">
    <div class="film-frame" data-reveal-clip>
      <img src="../media/film-summit1.jpg" alt="" loading="lazy" />
      <button class="film-frame__play" data-film="../media/film-summit1.mp4" aria-label="Play the project film"><span>PLAY</span></button>
    </div>
  </div>
  <div class="wrap">
    <div class="details">${details}</div>
  </div>
</section>
<section class="section light"><div class="wrap"><p class="eyebrow fade-up" style="margin-bottom:32px">Gallery</p></div><div class="gallery wrap" style="padding:0">${gallery}</div>
  <div class="wrap">
    <div class="delivered">
      <div class="fade-up"><strong>${p.photos ? p.photos + "+" : (p.clips || []).length}</strong><span>${p.photos ? "edited photos" : "clips in the film"}</span></div>
      <div class="fade-up"><strong>1</strong><span>project film</span></div>
      <div class="fade-up"><strong>3</strong><span>vertical reels</span></div>
      <div class="fade-up"><strong>[7]</strong><span>days to delivery</span></div>
    </div>
  </div>
</section>
<section class="cta">
  <div class="cta__bg" data-parallax="0.2">${video(next.loop + '.mp4', { poster: next.loop + '.jpg', base: '../' })}</div>
  <div class="cta__in">
    <p class="eyebrow fade-up" style="justify-content:center">Want your next project filmed like this?</p>
    <h2 class="display d-1 reveal-lines" style="margin-top:24px"><span class="line"><span>Tell me where</span></span><span class="line"><span>and when.</span></span></h2>
    <a class="btn btn--blue btn--lg fade-up" href="../contact" data-magnetic>Book a project shoot</a>
  </div>
</section>
<a class="next-project" href="./${next.slug}"><span class="eyebrow">Next project</span><span class="display d-4">${next.title} &rarr;</span></a>`;
}
