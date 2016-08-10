import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { rollup } from 'rollup';

// used to track the cache for subsequent bundles
let cache = null;
const log = console.log;

rollup({
  entry: 'src/knock.js',
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup'],
    }),
  ],
  cache,
}).then((bundle) => {
  // Cache our bundle for later use (optional)
  cache = bundle;

  bundle.write({
    format: 'cjs',
    dest: 'dist/knock.common.js',
  });

  bundle.write({
    format: 'es',
    dest: 'dist/knock.es.js',
  });
}).catch((error) => log(error));
