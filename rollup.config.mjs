import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
export default {
    input: 'index.js',
    output: [
        {
            format: 'cjs',
            file: 'bundle.js'
        }
    ],
    plugins: [
        resolve(),
        commonjs()
    ]
}