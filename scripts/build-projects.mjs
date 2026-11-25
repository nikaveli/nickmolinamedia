import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { layout } from '../src/templates/layout.mjs';
import { home } from '../src/pages/home.mjs';
import { work, builders, about, contact, project } from '../src/pages/others.mjs';
import { portfolio } from '../src/pages/portfolio.mjs';

const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
const w = (file, html) => writeFileSync(resolve(root, file), html);

w('index.html', layout({ title: 'Construction and Remodeling Videographer in Denver, CO | Nick Molina Media', description: 'Cinematic project films, reels, and photography for Colorado builders and remodelers. One visit, flat price. Your last job should sell your next one.', body: home(projects), bodyClass: 'is-home' }));
w('work.html', layout({ title: 'Builder Project Films and Photography | Nick Molina Media', description: 'Finished kitchens, baths, and additions from Colorado builders, filmed on site by Nick Molina Media.', body: work(projects), bodyClass: 'light-page' }));
w('portfolio.html', layout({ title: 'Portfolio: Every Clip, Every Project | Nick Molina Media', description: 'A parallax wall of every project clip filmed for Summit Custom Builders: kitchens, baths, additions, whole homes, and vertical reels.', body: portfolio(projects), bodyClass: 'is-portfolio' }));
w('builders.html', layout({ title: 'Video and Photography Packages for Builders | Nick Molina Media', description: 'Project Film, Builder Film Plan, and Signature Website packages for Denver builders and remodelers. Flat prices, one visit.', body: builders(), bodyClass: 'light-page' }));
w('about.html', layout({ title: 'About Nick Molina | Nick Molina Media', description: 'Nick Molina films finished projects for Colorado builders, in person, every time. Based in Denver.', body: about(), bodyClass: 'light-page' }));
w('contact.html', layout({ title: 'Book a Project Shoot | Nick Molina Media', description: 'Tell me where and when. Request a project shoot for your finished kitchen, bath, addition, or custom home.', body: contact(), bodyClass: 'light-page' }));
mkdirSync(resolve(root, 'work'), { recursive: true });
for (const p of projects) {
  w(`work/${p.slug}.html`, layout({ title: `${p.title} in ${p.city} | Filmed for Summit Custom Builders`, description: p.blurb, body: project(p, projects), bodyClass: 'is-project', depth: 1 }));
}
console.log(`built ${6 + projects.length} pages`);
