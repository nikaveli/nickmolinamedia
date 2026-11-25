import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';

const root = resolve(import.meta.dirname);
const pages = {
  main: resolve(root, 'index.html'),
  work: resolve(root, 'work.html'),
  portfolio: resolve(root, 'portfolio.html'),
  builders: resolve(root, 'builders.html'),
  about: resolve(root, 'about.html'),
  contact: resolve(root, 'contact.html'),
};
for (const f of readdirSync(resolve(root, 'work')).filter((f) => f.endsWith('.html'))) {
  pages['work-' + f.replace('.html', '')] = resolve(root, 'work', f);
}

export default defineConfig({
  root,
  build: { rollupOptions: { input: pages }, outDir: 'dist', emptyOutDir: true },
  server: { port: 5180, strictPort: true },
});
