import config from 'eslint-config-reactify';

// eslint-disable-next-line tsdoc/syntax
/** @type {import("eslint").Linter.Config} */
export default [
    ...config,
    {
        ignores: ['src/icon/icon.classes.ts', 'src/icon/icon.enums.ts'],
    },
];
