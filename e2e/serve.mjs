// Minimal static server for the built app with the single-page application fallback to index.html.
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = new URL('../dist/oneleft/browser/', import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4200);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

if (!existsSync(join(root, 'index.html'))) {
  console.error(`No build in ${root}: run npx ng build --configuration development first`);
  process.exit(1);
}

createServer((request, response) => {
  const path = normalize(
    decodeURIComponent(new URL(request.url, 'http://localhost').pathname),
  ).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, path);
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
    file = join(root, 'index.html');
  }
  response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, () => console.log(`OneLeft served on http://localhost:${port}`));
