/// <reference types="vitest/config" />
import { join, resolve } from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';

export default defineConfig({
    build: {
        cssCodeSplit: false,
        lib: {
            cssFileName: 'style',
            entry: {
                'icon/icon.classes': resolve(__dirname, join('src', 'icon', 'icon.classes.ts')),
                'icon/icon.enums': resolve(__dirname, join('src', 'icon', 'icon.enums.ts')),
                index: resolve(__dirname, join('src', 'index.ts')),
            },
            fileName: (_format, entryName) => entryName,
            formats: ['es', 'cjs'],
        },
        minify: true,
        rollupOptions: {
            // Exclude peer dependencies from the bundle to reduce bundle size
            external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
        },
        target: 'esnext',
    },
    plugins: [
        react(),
        cssInjectedByJsPlugin(),
        dts({
            entryRoot: 'src',
            exclude: [
                'src/test/**',
                'src/**/*.stories.*',
                '**/*.spec.*',
                '**/*.test.*',
            ],
            include: [
                resolve(__dirname, 'src/index.ts'),
                resolve(__dirname, 'src/icon/icon.classes.ts'),
                resolve(__dirname, 'src/icon/icon.enums.ts'),
            ],
            insertTypesEntry: true,
            outDir: 'dist',
            rollupTypes: true,
            tsconfigPath: './tsconfig.json',
        }),
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
