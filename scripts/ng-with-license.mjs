// Runs the Angular CLI with the PrimeUI license key, which is never stored in the repository.
// The key comes from the PRIMEUI_LICENSE environment variable or from a .env file next to package.json
// (ignored by Git). Without it the app still works, but PrimeNG shows a license notice.
//   node scripts/ng-with-license.mjs serve --port 4200
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const envFile = fileURLToPath(new URL('../.env', import.meta.url));
const fromFile = existsSync(envFile)
  ? readFileSync(envFile, 'utf8').match(/^\s*PRIMEUI_LICENSE\s*=\s*['"]?([^'"\r\n]*)['"]?\s*$/m)?.[1]
  : undefined;
const license = process.env.PRIMEUI_LICENSE || fromFile || '';

const args = process.argv.slice(2);
if (license) {
  // The value goes through JSON so any character in the key is a valid string literal
  args.push('--define', `PRIMEUI_LICENSE=${JSON.stringify(license)}`);
} else {
  console.warn('PRIMEUI_LICENSE is not set (environment or .env): PrimeNG will show a license notice.');
}

const ng = spawn(process.platform === 'win32' ? 'ng.cmd' : 'ng', args, { stdio: 'inherit', shell: false });
ng.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
