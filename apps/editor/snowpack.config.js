/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    'demo/esm': '/',
    'src/img': '/img',
    src: '/dist',
  },
  devOptions: {
    port: 8080,
  },
  alias: {
    '@': './src',
    '@t': './types',
  },
  workspaceRoot: '../../',
  packageOptions: {
    knownEntrypoints: ['prosemirror-commands'],
    rollup: {
      plugins: [
        require('@rollup/plugin-commonjs')({
          include: /node_modules/,
          requireReturnsDefault: 'auto',
        }),
      ],
    },
  },
};
