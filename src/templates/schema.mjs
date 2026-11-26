import { SITE } from './layout.mjs';

// Everything here is visible on the page it is attached to. Nothing is marked up that a visitor cannot see.
const AREA = ['Denver, Colorado', 'Denver metro area', 'Front Range, Colorado'];

export const business = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': SITE.url + '/#business',
  name: SITE.name,
  url: SITE.url + '/',
  telephone: SITE.tel,
  email: SITE.email,
  image: SITE.url + '/brand/og.png',
  logo: SITE.url + '/brand/icon-512.png',
  description: 'Cinematic project films, vertical reels, and photography for Colorado builders and remodelers. One visit, flat price, you own every file.',
  areaServed: AREA,
  serviceType: ['Construction videography', 'Remodeling photography', 'Project films for builders', 'Vertical reels for builders'],
  founder: { '@type': 'Person', name: 'Nick Molina' },
  sameAs: [SITE.instagram, SITE.facebook],
});

export const person = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': SITE.url + '/about#nick',
  name: 'Nick Molina',
  jobTitle: 'Videographer and photographer',
  url: SITE.url + '/about',
  image: SITE.url + '/media/nick.jpg',
  worksFor: { '@id': SITE.url + '/#business' },
  sameAs: [SITE.instagram, SITE.facebook],
});

// Prices as printed on the For Builders page.
export const offers = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': SITE.url + '/#business',
  name: SITE.name,
  url: SITE.url + '/builders',
  areaServed: AREA,
  makesOffer: [
    { '@type': 'Offer', name: 'Project Film', price: '950', priceCurrency: 'USD', description: 'One visit: a 45 to 60 second project film, three vertical reels, and 20+ edited photos. $750 for your first project.', url: SITE.url + '/builders' },
    { '@type': 'Offer', name: 'Build Story', price: '1900', priceCurrency: 'USD', description: 'One project, three visits: before, during, and reveal. Before-and-after film, project film, six reels, 30+ photos.', url: SITE.url + '/builders' },
    { '@type': 'Offer', name: 'Builder Film Plan', price: '1200', priceCurrency: 'USD', description: 'Per month on a six-month plan: one finished-project shoot and one in-progress visit a month, reels and photos posted to your Google Business Profile.', url: SITE.url + '/builders' },
    { '@type': 'Offer', name: 'Signature Website', price: '2500', priceCurrency: 'USD', description: 'From $2,500. A cinematic home page and a project page for every job filmed.', url: SITE.url + '/builders' },
  ],
});

// Only questions whose answers are final. A bracketed answer is still a placeholder and stays out.
export const faq = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.filter((f) => !/\[/.test(f.a)).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumbs = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE.url + path })),
});

export const projectVideo = (p, published) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: `${p.title}, ${p.room.toLowerCase()} in ${p.city}`,
  description: p.blurb,
  thumbnailUrl: `${SITE.url}/media/${p.loop}.jpg`,
  contentUrl: `${SITE.url}/media/${p.loop}.mp4`,
  uploadDate: published,
  creator: { '@id': SITE.url + '/#business' },
  about: { '@type': 'Organization', name: 'Summit Custom Builders', url: 'https://summitcustombuilders.net' },
});
