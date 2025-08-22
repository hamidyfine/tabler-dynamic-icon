import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss';
import sassEmbedded from 'sass-embedded';

export default {
    input: 'src/index.ts',
    output: [
        {
            chunkFileNames: 'cjs/[name]-[hash].cjs',
            dir: 'dist',
            entryFileNames: 'cjs/[name].cjs',
            format: 'cjs',
            sourcemap: true,
        },
        {
            chunkFileNames: 'esm/[name]-[hash].js',
            dir: 'dist',
            entryFileNames: 'esm/[name].js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        scss({
            fileName: 'styles.css',
            outputStyle: 'compressed',
            sass: sassEmbedded,
            sourceMap: true,
        }),
        typescript({
            tsconfig: './tsconfig.json',
        }),
    ],
    treeshake: true,
};
