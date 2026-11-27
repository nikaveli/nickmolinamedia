import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { resolve } from 'node:path';
import { layout, SITE } from '../src/templates/layout.mjs';
import { home, HOME_FAQ } from '../src/pages/home.mjs';
import { work, builders, about, contact, project, notFound, BUILDER_FAQ } from '../src/pages/others.mjs';
import { business, person, offers, faq, breadcrumbs, projectVideo } from '../src/templates/schema.mjs';
import { portfolio } from '../src/pages/portfolio.mjs';

const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
// Headline lines are separate block spans; a space between them keeps a plain-text read from
// running "in person,every time." together.
const w = (file, html) => writeFileSync(resolve(root, file), html.replace(/<\/span><\/span><span class="line">/g, '</span></span> <span class="line">'));
// Clean URL for a page file: index.html -> /, about.html -> /about, work/x.html -> /work/x
const pathOf = (file) => '/' + file.replace(/index\.html$/, '').replace(/\.html$/, '');
// Last commit that touched a page, for the sitemap. Falls back to today for a page not committed yet.
const today = new Date().toISOString().slice(0, 10);
const lastmod = (file) => { try { return execSync(`git log -1 --format=%cs -- ${file}`, { cwd: root, encoding: 'utf8' }).trim() || today; } catch { return today; } };
const firstPublished = (file) => { try { return execSync(`git log --diff-filter=A --format=%cs -- ${file}`, { cwd: root, encoding: 'utf8' }).trim().split('\n').pop() || today; } catch { return today; } };
// Project meta description: the first sentence of the blurb plus the credit, kept near 155 characters.
const projectDescription = (p) => {
  const first = p.blurb.split(/(?<=\.)\s+/)[0];
  const credit = ' Built by Summit Custom Builders, filmed on site by Nick Molina Media.';
  if ((first + credit).length <= 158) return first + credit;
  if (first.length <= 158) return first;
  return `${p.room} in ${p.city}, built by Summit Custom Builders and filmed on site by Nick Molina Media.`;
};
const pages = [];
const page = (file, opts) => { pages.push(file); w(file, layout({ ...opts, path: pathOf(file) })); };

page('index.html', { title: 'Construction Videographer in Denver, CO | Nick Molina Media', description: 'Cinematic project films, reels, and photography for Colorado builders and remodelers. One visit, flat price. Your last job should sell your next one.', body: home(projects), bodyClass: 'is-home', jsonld: [business(), faq(HOME_FAQ)],
  preload: [{ href: 'media/hero-mobile-poster.jpg', media: '(max-width: 699px) and (orientation: portrait)' }, { href: 'media/hero-poster.jpg', media: '(min-width: 700px)' }] });
page('work.html', { title: 'Builder Project Films and Photography | Nick Molina Media', description: 'Finished kitchens, baths, and additions from Colorado builders, filmed on site by Nick Molina Media.', body: work(projects), bodyClass: 'is-film', preload: [{ href: 'media/hero-u081.jpg' }], jsonld: [breadcrumbs([['Home', '/'], ['Work', '/work']])] });
page('portfolio.html', { title: 'Portfolio: Every Clip, Every Project | Nick Molina Media', description: 'A parallax wall of every project clip filmed for Summit Custom Builders: kitchens, baths, additions, whole homes, and vertical reels.', body: portfolio(projects), bodyClass: 'is-portfolio', jsonld: [breadcrumbs([['Home', '/'], ['Portfolio', '/portfolio']])] });
page('builders.html', { title: 'Video and Photography Packages for Builders | Nick Molina Media', description: 'Project Film, Builder Film Plan, and Signature Website packages for Denver builders and remodelers. Flat prices, one visit.', body: builders(), bodyClass: 'is-film', preload: [{ href: 'media/room-addition.jpg' }], jsonld: [offers(), faq(BUILDER_FAQ.map((f) => ({ q: f.q, a: f.a }))), breadcrumbs([['Home', '/'], ['For Builders', '/builders']])] });
page('about.html', { title: 'About Nick Molina | Nick Molina Media', description: 'Nick Molina films finished projects for Colorado builders, in person, every time. Based in Denver.', body: about(), bodyClass: 'is-film', preload: [{ href: 'media/hero-u152.jpg' }], jsonld: [person(), breadcrumbs([['Home', '/'], ['About', '/about']])] });
page('contact.html', { title: 'Book a Project Shoot | Nick Molina Media', description: 'Tell me where and when. Request a project shoot for your finished kitchen, bath, addition, or custom home.', body: contact(), bodyClass: 'is-film is-contact', preload: [{ href: 'media/hero-u136.jpg' }], jsonld: [business(), breadcrumbs([['Home', '/'], ['Contact', '/contact']])] });
w('404.html', layout({ title: 'Page not found | Nick Molina Media', description: 'That page is not here. See the work, the packages, or book a project shoot.', body: notFound(), bodyClass: 'light-page', path: '/404', noindex: true }));
mkdirSync(resolve(root, 'work'), { recursive: true });
for (const p of projects) {
  const file = `work/${p.slug}.html`;
  page(file, { title: `${p.title} in ${p.city} | Nick Molina Media`, description: projectDescription(p), body: project(p, projects), bodyClass: 'is-project', depth: 1, preload: [{ href: `media/${p.loop}.jpg` }],
    jsonld: [projectVideo(p, firstPublished(file)), breadcrumbs([['Home', '/'], ['Work', '/work'], [p.title, pathOf(file)]])] });
}
// Sitemap: every page above, at its clean URL. Served from /sitemap.xml and named in robots.txt.
const urls = pages.map((f) => `  <url><loc>${SITE.url}${pathOf(f)}</loc><lastmod>${lastmod(f)}</lastmod></url>`).join('\n');
w('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
console.log(`built ${pages.length} pages + 404, sitemap with ${pages.length} urls`);
