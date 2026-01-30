import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));

const {
  version,
  name,
  license,
  repository,
  author,
} = packageJson;

const year = new Date().getFullYear();
const authorName = author.replace(/ *\<[^)]*\> */g, " ");

const banner = `/*!
  ${name} v${version}
  ${repository}

  Copyright (c) ${year} ${authorName}

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
*/`;

export default defineConfig({
  build: {
    outDir: 'build',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BGCN',
      formats: ['umd', 'es'], // UMD for browser, ESM for modern bundlers
      fileName: (format) => {
        if (format === 'es') {
          return 'bgcn.esm.js';
        }
        return 'bgcn.js';
      }
    },
    minify: 'terser',
    terserOptions: {
      format: {
        comments: /^!|bulgarian-control-numbers/i,
      },
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        banner,
      },
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'build',
      include: ['src/**/*.ts'],
    })
  ]
});
