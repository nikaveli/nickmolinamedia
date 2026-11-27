// Build one film per project from that project's own source clips, in the order listed in projects.json.
// Straight assembly only: scale to 1280x720, 24 fps, half-second dissolves between clips, fade in and out.
// Nothing is generated or altered. Swap any output for a hand-edited film by replacing public/media/film-<slug>.mp4.
//
// Usage: node scripts/encode-films.mjs [scripts/clip-sources.tsv]
// clip-sources.tsv columns: id, md5, duration, absolute source path (tab separated). It is not in git.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const tsv = resolve(root, process.argv[2] || 'scripts/clip-sources.tsv');
const sources = new Map(readFileSync(tsv, 'utf8').split('\n').filter(Boolean).map((l) => { const [id, , dur, src] = l.split('\t'); return [id, { dur: Number(dur), src }]; }));
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
const FADE = 0.5;
const films = {};

for (const p of projects) {
  const clips = (p.clips || []).map((id) => ({ id, ...sources.get(id) })).filter((c) => c.src && existsSync(c.src));
  if (clips.length < 2) { console.warn(`skip ${p.slug}: ${clips.length} usable clips`); continue; }
  const out = resolve(root, `public/media/film-${p.slug}.mp4`);
  const still = resolve(root, `public/media/film-${p.slug}.jpg`);
  // Normalize every clip, then chain dissolves: each offset is the running length so far minus one fade.
  const norm = clips.map((_, i) => `[${i}:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=24,format=yuv420p,setsar=1,settb=AVTB[v${i}]`);
  const chain = [];
  let prev = 'v0', length = clips[0].dur;
  for (let i = 1; i < clips.length; i++) {
    const label = `x${i}`;
    chain.push(`[${prev}][v${i}]xfade=transition=fade:duration=${FADE}:offset=${(length - FADE).toFixed(3)}[${label}]`);
    length += clips[i].dur - FADE;
    prev = label;
  }
  const total = length;
  const filter = [...norm, ...chain, `[${prev}]fade=t=in:st=0:d=0.5,fade=t=out:st=${(total - 0.6).toFixed(3)}:d=0.6[out]`].join(';');
  const args = ['-nostdin', '-v', 'error', '-y', ...clips.flatMap((c) => ['-i', c.src]), '-filter_complex', filter, '-map', '[out]', '-an',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out];
  execFileSync('ffmpeg', args, { stdio: 'inherit' });
  // Still for the play frame: one second into the film, after the fade-in.
  execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-ss', '1.2', '-i', out, '-frames:v', '1', '-q:v', '3', still], { stdio: 'inherit' });
  films[p.slug] = { seconds: Math.round(total), clips: clips.length };
  console.log(`${p.slug}: ${clips.length} clips, ${total.toFixed(1)}s`);
}
writeFileSync(resolve(root, 'src/data/films.json'), JSON.stringify(films, null, 2) + '\n');
console.log(`wrote ${Object.keys(films).length} films`);
