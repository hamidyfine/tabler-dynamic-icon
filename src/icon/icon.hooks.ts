import { useContext } from 'react';

import { IconsContext } from './icon.provider';

export const useIconsRegistry = () => {
    const context = useContext(IconsContext);

    // Return the context value, which will be { icons: undefined } if no provider is used
    return context || { icons: undefined };
};
