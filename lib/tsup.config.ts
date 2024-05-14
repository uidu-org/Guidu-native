const config = (opts) => ({
  entry: ['./src/index.ts'],
  format: ['cjs', 'esm'],
  minify: !opts.watch,
  clean: !opts.watch,
  dts: true,
  outDir: 'dist',
  target: 'es2019',
  banner: { js: '"use client";' },
});

export default config;
