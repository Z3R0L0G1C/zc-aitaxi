const {resolve} = require('path');
const buildPath = resolve(__dirname, "../build");

const {build} = require('esbuild');
const { globPlugin } = require('esbuild-plugin-glob');



build({
    entryPoints: ['./client/*.ts', './server/*.ts', './shared/*.ts'],
    outdir: resolve(buildPath, './'),
    bundle:true,
    minify:true,
    platform: 'browser',
    target: 'es2020',
    logLevel: 'info',
    plugins: [globPlugin(),
    ],
}).catch(() => process.exit(1));