import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs';
import { createRequire } from 'module';
import rawBanner from 'rollup-plugin-banner';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const banner = rawBanner.default?.default ?? rawBanner.default ?? rawBanner;
const createTsPlugin = (outDir) =>
  typescript({
    tsconfig: './tsconfig.json',
    compilerOptions: {
      outDir,
      noEmit: false,
    },
  });

function i18nEditorImportPath() {
  return {
    name: 'i18nEditorImportPath',
    transform(code) {
      return code.replace('../editorCore', '@darodrig/tui-editor-ng');
    },
  };
}

const fileNames = fs.readdirSync('./src/i18n');

function createBannerPlugin(type) {
  return banner(
    [
      `@darodrig/tui-editor-ng${type ? ` : ${type}` : ''}`,
      `@version ${pkg.version} | ${new Date().toDateString()}`,
      `@author ${pkg.author}`,
      `@license ${pkg.license}`,
    ].join('\n')
  );
}

export default [
  // editor
  {
    input: 'src/esm/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: false,
    },
    plugins: [createTsPlugin('dist/esm'), commonjs(), nodeResolve(), createBannerPlugin()],
    external: [/^prosemirror/],
  },
  // viewer
  {
    input: 'src/esm/indexViewer.ts',
    output: {
      dir: 'dist/esm',
      format: 'es',
      sourcemap: false,
    },
    plugins: [createTsPlugin('dist/esm'), commonjs(), nodeResolve(), createBannerPlugin('viewer')],
    external: [/^prosemirror/],
  },
  // i18n
  {
    input: fileNames.map((fileName) => `src/i18n/${fileName}`),
    output: {
      dir: 'dist/esm/i18n',
      format: 'es',
      sourcemap: false,
    },
    external: ['@darodrig/tui-editor-ng'],
    plugins: [
      createTsPlugin('dist/esm/i18n'),
      commonjs(),
      nodeResolve(),
      i18nEditorImportPath(),
      createBannerPlugin('i18n'),
    ],
  },
];
