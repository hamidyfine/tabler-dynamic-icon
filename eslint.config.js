import config from 'eslint-config-reactify';
import storybook from 'eslint-plugin-storybook';

// eslint-disable-next-line tsdoc/syntax
/** @type {import("eslint").Linter.Config} */
export default [
    ...config,
    ...storybook.configs['flat/recommended'],
    {
        ignores: ['src/icon/icon.classes.ts', 'src/icon/icon.enums.ts'],
    },
];
