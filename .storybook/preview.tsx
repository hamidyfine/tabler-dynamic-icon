import '../src/global.css';

import type { Decorator, Preview } from '@storybook/react';

const withThemeProvider: Decorator = (Story) => (
    // <Provider>
    <Story />
    // </Provider>
);

const preview: Preview = {
    decorators: [withThemeProvider],
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    tags: ['autodocs'],
};

export default preview;
