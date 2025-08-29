import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function build() {
  // First build the client
  console.log('Building client...');
  execSync('npm run build:client', { stdio: 'inherit' });
  
  // Then build server
  console.log('Building server...');
  await esbuild.build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node14',
    format: 'esm',
    outfile: 'server-dist/index.js',
    external: ['express', 'vite', 'react', 'react-dom', '@babel/preset-typescript/package.json', '@babel/*'],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    banner: {
      js: `
globalThis.__dirname = new URL('.', import.meta.url).pathname;
globalThis.__filename = new URL('', import.meta.url).pathname;
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
      `
    }
  });
}

build().catch(() => process.exit(1));
