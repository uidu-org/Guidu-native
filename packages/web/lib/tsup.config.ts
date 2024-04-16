import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  minify: true,
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  target: 'es2019',
});
