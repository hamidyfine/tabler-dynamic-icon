import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react()],
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
