import fs from 'fs'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

const pak = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

const banner = `/**
 * js-bus v${pak.version}
 * https://github.com/Mywbj/js-bus
 * @license MIT
 */`

const config = {
  input: './src/javascript-bus.js',
  output: [
    {
      file: './dist/javascript-bus.esm.js',
      format: 'es',
      banner
    },
    {
      file: './dist/javascript-bus.cjs.js',
      format: 'cjs',
      banner
    },
    {
      file: './dist/javascript-bus.js',
      format: 'umd',
      name: 'JavascriptBus',
      banner,
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    // uglify()
  ]
}

export default config
