import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync, existsSync } from 'node:fs';

const root = resolve(import.meta.dirname);
const pages = {
  main: resolve(root, 'index.html'),
  work: resolve(root, 'work.html'),
  portfolio: resolve(root, 'portfolio.html'),
  builders: resolve(root, 'builders.html'),
  about: resolve(root, 'about.html'),
  contact: resolve(root, 'contact.html'),
  notfound: resolve(root, '404.html'),
};
for (const f of readdirSync(resolve(root, 'work')).filter((f) => f.endsWith('.html'))) {
  pages['work-' + f.replace('.html', '')] = resolve(root, 'work', f);
}

// Production (Cloudflare static assets, html_handling: auto-trailing-slash) serves /portfolio and
// /work/navy-kitchen from portfolio.html and work/navy-kitchen.html. Give the dev server the same rules so
// the addresses in the nav, and the ones people type, resolve to the right page here too.
const cleanUrls = () => ({
  name: 'clean-urls',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const [path, query] = req.url.split('?');
      if (path !== '/' && !/\.[a-z0-9]+$/i.test(path)) {
        const bare = path.replace(/\/+$/, '');
        const file = bare ? bare + '.html' : '/index.html';
        if (existsSync(resolve(root, '.' + file))) req.url = file + (query ? '?' + query : '');
      }
      next();
    });
  },
});

export default defineConfig({
  root,
  plugins: [cleanUrls()],
  build: { rollupOptions: { input: pages }, outDir: 'dist', emptyOutDir: true },
  server: { port: 5180, strictPort: true },
});
