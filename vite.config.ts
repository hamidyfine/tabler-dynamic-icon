/// <reference types="vitest/config" />
import { join, resolve } from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';

export default defineConfig({
    build: {
        lib: {
            cssFileName: 'style',
            entry: resolve(__dirname, join('src', 'index.ts')),
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        minify: false,
        rollupOptions: {
            // Exclude peer dependencies from the bundle to reduce bundle size
            external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
        },
        target: 'esnext',
    },
    plugins: [
        react(),
        dts({ rollupTypes: true }), // Output .d.ts files
    ],
    test: {
        coverage: {
            all: true,
            enabled: true,
            exclude: [
                'src/test/**',
                'src/index.ts',
                'src/**/index.ts',
                'src/**/types.ts',
                'src/**/types.d.ts',
                'src/**/*.stories.tsx',
                '.storybook',
                '*.config.*',
            ],
            provider: 'v8',
        },
        environment: 'jsdom',
        globals: true,
        mockReset: true,
        setupFiles: './src/test/setup.ts',
    },
});
