import { video, SITE } from '../templates/layout.mjs';

export const HOME_FAQ = [
  { q: "When should I call you?", a: "A week or two before a project wraps. The best footage happens around final walkthrough, before furniture and daily life move in." },
  { q: "What if the homeowner already lives there?", a: "We still shoot. I work around their schedule and keep personal items out of frame." },
  { q: "Do you film work in progress?", a: "Yes. Framing, tile, and cabinet install days make strong before-and-after footage, and they keep your feeds current between finishes." },
  { q: "Who owns the footage?", a: "You do. Use it anywhere, for good." },
  { q: "Do you need the homeowner's permission?", a: "I'll give you a one-page release to pass along. Most homeowners are proud to show the work." },
  { q: "Where do you work?", a: "Denver metro and the Front Range. Close enough that I'm always there in person." },
];

export function home(projects) {
  const featured = projects.slice(0, 6);
  const cards = featured.map((p) => `
        <a class="card" href="./work/${p.slug}" data-filter="${p.filter}">
          ${video(p.loop + '.mp4', { poster: p.loop + '.jpg' })}
          <div class="card__meta"><h3>${p.title}</h3><span>${p.room} &middot; ${p.city}</span></div>
        </a>`).join('');

  return `
<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero__media" id="heroMedia">
    <video id="heroVideo" muted playsinline loop autoplay preload="auto" poster="./media/hero-poster.jpg"
      data-desktop="./media/hero.mp4" data-mobile="./media/hero-mobile.mp4" data-mobile-poster="./media/hero-mobile-poster.jpg"></video>
    <div class="hero__shade"></div>
    <div class="hero__grain"></div>
    <div class="hero__dim" id="heroDim"></div>
  </div>
  <div class="hero__statement" id="heroStatement" aria-hidden="true">
    <p><span class="w">Your</span> <span class="w">last</span> <span class="w">job</span> <span class="w">should</span><br /><span class="w"><em>sell</em></span> <span class="w">your</span> <span class="w">next</span> <span class="w">one.</span></p>
  </div>
  <div class="hero__content" id="heroContent">
    <p class="eyebrow hero__eyebrow fade-up">Cinematic video and photography for Colorado builders</p>
    <h1 class="display d-1 hero__title" id="heroTitle">
      <span class="line"><span>Your last job</span></span>
      <span class="line"><span>should sell</span></span>
      <span class="line"><span>your next one.</span></span>
    </h1>
    <div class="hero__row">
      <p class="hero__sub fade-up">I film finished kitchens, baths, additions, and custom homes across the Front Range. You get the film, reels, and photos that win the next bid.</p>
      <div class="hero__actions fade-up">
        <a class="btn btn--blue" href="./contact" data-magnetic>Book a project shoot</a>
        <a class="btn btn--ghost" href="./work" data-magnetic>See the work <span class="arrow">&rarr;</span></a>
      </div>
    </div>
    <ul class="hero__chips fade-up"><li>One visit</li><li>Film in 7 days</li><li>No contract</li><li>You own every file</li><li>Denver + Front Range</li></ul>
  </div>
  <div class="hero__scroll"><i></i><span>Scroll</span></div>
</section>

<!-- SHIFT: pinned room sequence -->
<section class="shift" id="shift" aria-label="Three rooms">
  <div class="shift__panel" data-panel>${video('room-kitchen.mp4', { poster: 'room-kitchen.jpg' })}</div>
  <div class="shift__panel" data-panel>${video('room-bath.mp4', { poster: 'room-bath.jpg' })}</div>
  <div class="shift__panel" data-panel>${video('room-addition.mp4', { poster: 'room-addition.jpg' })}</div>
  <div class="shift__counter"><b>01</b><span class="shift__bar"><i></i></span><span>03</span></div>
  <div class="shift__copy">
    <p class="shift__line" data-line>You finished a <em>beautiful</em> project.</p>
    <p class="shift__line" data-line>The homeowner <em>moved in.</em></p>
    <p class="shift__line" data-line>All you have is <em>six phone photos.</em></p>
  </div>
</section>

<!-- PROBLEM -->
<section class="section light problem">
  <div class="wrap grid-2">
    <div>
      <p class="eyebrow fade-up">The problem</p>
      <h2 class="problem__big reveal-lines" style="margin-top:24px">
        <span class="line"><span>Homeowners decide</span></span>
        <span class="line"><span>in thirty seconds,</span></span>
        <span class="line"><span>on a phone.</span></span>
      </h2>
    </div>
    <div>
      <p class="lead fade-up">The next homeowner is comparing three builders tonight, on a phone, in about thirty seconds each. They are not reading your reviews first. They are looking for proof. The builder whose work they can see gets the call. The others never hear about the job.</p>
    </div>
  </div>
</section>

<!-- STEPS -->
<section class="section steps" id="how">
  <div class="wrap">
    <p class="eyebrow fade-up">How it works</p>
    <h2 class="display d-2 reveal-lines" style="margin-top:24px; max-width: 14ch">
      <span class="line"><span>Everything</span></span>
      <span class="line"><span>from one visit.</span></span>
    </h2>
    <div class="steps__list">
      <div class="step" data-step>
        <div class="step__num">01</div>
        <h3>Tell me when it's done.</h3>
        <p>Send the address and a time window around final walkthrough. That's all I need from you.</p>
      </div>
      <div class="step" data-step>
        <div class="step__num">02</div>
        <h3>I show up and film.</h3>
        <p>Me, not a crew. About 2 to 3 hours on site, with no disruption to your homeowner.</p>
      </div>
      <div class="step" data-step>
        <div class="step__num">03</div>
        <h3>You get the full set.</h3>
        <p>A project film, vertical reels, and edited photos in 7 days, sized for your website, Google profile, Instagram, and Facebook.</p>
      </div>
    </div>
  </div>
</section>

<!-- WORK STRIP -->
<section class="work-strip" id="work">
  <div class="work-strip__pin">
    <div class="work-strip__head">
      <div>
        <p class="eyebrow">Recent work</p>
        <h2 class="display d-3" style="margin-top:16px">Summit Custom Builders</h2>
        <p class="muted" style="margin-top:10px">Five years of kitchens, baths, and additions for one Denver builder.</p>
      </div>
      <a class="btn btn--ghost" href="./work" data-magnetic>All work <span class="arrow">&rarr;</span></a>
    </div>
    <div class="work-strip__track" id="workTrack">
      ${cards}
      <a class="card card--end" href="./work"><span class="display d-4">See every project &rarr;</span></a>
    </div>
  </div>
</section>

<!-- WHO I FILM FOR -->
<section class="section light who">
  <div class="wrap">
    <div class="grid-2" style="align-items:end">
      <div>
        <h2 class="display d-2 reveal-lines"><span class="line"><span>Built for trades where</span></span><span class="line"><span>the work is the proof.</span></span></h2>
      </div>
      <p class="lead fade-up">If a homeowner picks you because of how the last job looks, this is for you.</p>
    </div>
    <div class="who__grid">
      <a class="who__card who__card--live fade-up" href="./builders"><video class="who__bg" muted playsinline loop preload="metadata" data-src="./media/clips/u136.mp4" poster="./media/clips/u136.jpg" aria-hidden="true"></video><div class="who__body"><h3>Custom home builders</h3><p>Whole homes, filmed at the finish and along the way.</p></div></a>
      <a class="who__card who__card--live fade-up" href="./builders"><video class="who__bg" muted playsinline loop preload="metadata" data-src="./media/clips/u097.mp4" poster="./media/clips/u097.jpg" aria-hidden="true"></video><div class="who__body"><h3>Remodelers and design-build</h3><p>Whole-home and main-level remodels with a real before.</p></div></a>
      <a class="who__card who__card--live fade-up" href="./builders"><video class="who__bg" muted playsinline loop preload="metadata" data-src="./media/clips/u086.mp4" poster="./media/clips/u086.jpg" aria-hidden="true"></video><div class="who__body"><h3>Kitchen and bath specialists</h3><p>The rooms homeowners search for first, and judge hardest.</p></div></a>
      <a class="who__card who__card--live fade-up" href="./builders"><video class="who__bg" muted playsinline loop preload="metadata" data-src="./media/clips/u114.mp4" poster="./media/clips/u114.jpg" aria-hidden="true"></video><div class="who__body"><h3>Additions and ADUs</h3><p>Framing to finish, the transformation homeowners want to see.</p></div></a>
      <a class="who__card who__card--live fade-up" href="./builders"><video class="who__bg" muted playsinline loop preload="metadata" data-src="./media/clips/u023.mp4" poster="./media/clips/u023.jpg" aria-hidden="true"></video><div class="who__body"><h3>Outdoor living and pools</h3><p>Decks, patios, and backyards that sell best at dusk.</p></div></a>
      <a class="who__card who__card--live fade-up" href="./builders"><video class="who__bg" muted playsinline loop preload="metadata" data-src="./media/clips/u157.mp4" poster="./media/clips/u157.jpg" aria-hidden="true"></video><div class="who__body"><h3>The trades behind them</h3><p>Cabinets, tile, counters, framing. Licensed footage of your part of the job.</p></div></a>
    </div>
  </div>
</section>

<!-- DELIVERABLES: stacked cards -->
<section class="section stack" id="deliverables">
  <div class="wrap">
    <h2 class="display d-2 reveal-lines" style="max-width: 16ch">
      <span class="line"><span>What one project</span></span>
      <span class="line"><span>turns into.</span></span>
    </h2>
    <div class="stack__cards" style="margin-top:64px">
      <article class="stack-card">
        <div><div class="stack-card__n">The film</div><h3>A 45 to 60 second project film</h3><p>For your website, your Google profile, and the estimate you send to the next homeowner. It walks them through the room the way a photo never can.</p></div>
        <div class="stack-card__media">${video('p-white-kitchen.mp4', { poster: 'p-white-kitchen.jpg' })}</div>
      </article>
      <article class="stack-card">
        <div><div class="stack-card__n">The reels</div><h3>Three vertical reels, ready to post</h3><p>Cut for Instagram and Facebook with the hook in the first two seconds. Post them the week the job wraps, tag your trades, and let the work travel.</p></div>
        <div class="stack-card__media stack-card__media--vert">${video('clips/u033.mp4', { poster: 'clips/u033.jpg' })}</div>
      </article>
      <article class="stack-card">
        <div><div class="stack-card__n">The photos</div><h3>20+ edited photos</h3><p>Wide shots, mid shots, and the details. Sized for your gallery and your Google Business Profile, the first place a homeowner checks before they call.</p></div>
        <div class="stack-card__media"><img src="./media/photos/navy-kitchen-02.jpg" alt="Navy kitchen with brass hardware" loading="lazy" /></div>
      </article>
      <article class="stack-card">
        <div><div class="stack-card__n">The craft</div><h3>Close-ups of the work itself</h3><p>Tile lines, cabinet reveals, hardware, trim. The things a homeowner notices in person and never sees in a phone photo.</p></div>
        <div class="stack-card__media">${video('clips/u127.mp4', { poster: 'clips/u127.jpg' })}</div>
      </article>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<div class="marquee light" aria-hidden="true">
  <div class="marquee__track" id="marquee">
    <span>Document <i>&middot;</i> Film <i>&middot;</i> Show <i>&middot;</i> Prove <i>&middot;</i> Stay visible <i>&middot;</i> Finish strong <i>&middot;</i></span>
    <span>Document <i>&middot;</i> Film <i>&middot;</i> Show <i>&middot;</i> Prove <i>&middot;</i> Stay visible <i>&middot;</i> Finish strong <i>&middot;</i></span>
  </div>
</div>

<!-- DURING THE BUILD -->
<section class="section light">
  <div class="wrap grid-2">
    <div class="sticky">
      <p class="eyebrow fade-up">During the build</p>
      <h2 class="display d-2 reveal-lines" style="margin-top:24px">
        <span class="line"><span>Your projects</span></span>
        <span class="line"><span>take months.</span></span>
        <span class="line"><span><em>Your visibility</em></span></span>
        <span class="line"><span><em>shouldn't.</em></span></span>
      </h2>
      <p class="lead fade-up" style="margin-top:28px">On the Builder Film Plan I stop by active jobs between finishes. Framing, tile going in, cabinet install day. The footage keeps your feeds and your Google profile current while the big reveal is still months out, and it becomes the before in your before-and-after.</p>
      <a class="btn btn--blue fade-up" style="margin-top:32px" href="./builders" data-magnetic>See the Builder Film Plan</a>
    </div>
    <div class="stack-card__media" data-reveal-clip data-parallax="0.12" style="aspect-ratio: 4/5">${video('room-addition.mp4', { poster: 'room-addition.jpg' })}</div>
  </div>
</section>

<!-- WHY ME -->
<section class="section why" id="about">
  <div class="wrap grid-2">
    <div class="why__portrait why__portrait--photo" data-reveal-clip data-parallax="0.1">
      <img src="./media/nick.jpg" srcset="./media/nick-640.jpg 640w, ./media/nick.jpg 1024w" sizes="(max-width: 900px) 100vw, 50vw" width="1024" height="1536" alt="Nick Molina" loading="lazy" decoding="async" />
    </div>
    <div>
      <h2 class="display d-2 reveal-lines">
        <span class="line"><span>I show up</span></span>
        <span class="line"><span>in person,</span></span>
        <span class="line"><span>every time.</span></span>
      </h2>
      <p class="lead fade-up" style="margin-top:28px">I'm Nick Molina. I come to your finished project, film it myself, and hand you a film, reels, and photos you own outright. Then I make sure they land where homeowners look you up, so your next bid starts with your best work already in front of them.</p>
      <p class="fade-up muted" style="margin-top:18px">Based in Denver. Front Range only, so I can always be there in person.</p>
      <p class="eyebrow fade-up" style="margin-top:36px">How I work</p>
      <ul class="terms fade-up">
        <li>No contract on single projects</li>
        <li>You own every file, for good</li>
        <li>One revision round on every film</li>
        <li>First visit within a week of booking</li>
        <li>No travel fee inside the Denver metro</li>
        <li>Your company credited by name, everywhere the work appears</li>
      </ul>
    </div>
  </div>
</section>

<!-- BUILDER CREDIT -->
<section class="section camel credit">
  <div class="wrap grid-2" style="align-items:center">
    <h2 class="display d-3 reveal-lines"><span class="line"><span>Every builder credited</span></span><span class="line"><span>by name, everywhere.</span></span></h2>
    <div>
      <p class="lead fade-up">Your company name goes on every film, reel, and photo set wherever the work appears. Homeowners who find the footage find you. Summit Custom Builders is credited on every project on this site.</p>
      <a class="btn btn--ghost fade-up" style="margin-top:24px" href="./work" data-magnetic>See the Summit projects <span class="arrow">&rarr;</span></a>
    </div>
  </div>
</section>

<!-- PACKAGES -->
<section class="section light packages" id="packages">
  <div class="wrap">
    <div class="grid-2" style="align-items:end">
      <div>
        <h2 class="display d-2 reveal-lines"><span class="line"><span>Packages</span></span><span class="line"><span>and prices.</span></span></h2>
      </div>
      <p class="lead fade-up">Three shapes, nothing else to decode: one visit, one whole project, or a monthly rhythm. No contract on the first one. Start with a project, and stay when you see what it brings in.</p>
    </div>
    <div class="packages__grid">
      <div class="pkg fade-up">
        <div class="pkg__tag">One visit</div>
        <h3>Project Film</h3>
        <div class="pkg__price"><strong>$950</strong>per finished project &middot; $750 for your first</div>
        <ul><li>45 to 60 second cinematic project film</li><li>Three vertical reels for Instagram and Facebook</li><li>20+ edited photos, wide to detail</li><li>Delivered in 7 days</li></ul>
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
  </div>
</section>

<!-- FAQ -->
<section class="section light" style="padding-top:0">
  <div class="wrap grid-2">
    <div class="sticky">
      <h2 class="display d-3 reveal-lines"><span class="line"><span>What builders</span></span><span class="line"><span>ask first.</span></span></h2>
    </div>
    <div class="faq__list" id="faq">
      ${HOME_FAQ.map((f) => `<div class="faq__item"><button class="faq__q" aria-expanded="false">${f.q} <span class="plus"></span></button><div class="faq__a"><p>${f.a}</p></div></div>`).join('\n      ')}
    </div>
  </div>
</section>

<!-- CLOSING CTA -->
<section class="cta" id="contact">
  <div class="cta__bg" data-parallax="0.2">${video('p-vaulted-kitchen.mp4', { poster: 'p-vaulted-kitchen.jpg' })}</div>
  <div class="cta__in">
    <p class="eyebrow fade-up" style="justify-content:center">Got a project wrapping up?</p>
    <h2 class="display d-1 reveal-lines" style="margin-top:24px"><span class="line"><span>Tell me where</span></span><span class="line"><span>and when.</span></span></h2>
    <p class="lead fade-up" style="margin: 24px auto 0; text-align:center">Send the address and a time window. I'll take it from there.</p>
    <a class="btn btn--blue btn--lg fade-up" href="./contact" data-magnetic>Book a project shoot</a>
    <p class="cta__phone fade-up">Or call or text <a href="tel:${SITE.tel}">${SITE.phone}</a></p>
  </div>
</section>`;
}
