import { useContext } from 'react';

import { IconsContext } from './icon.provider';

export const useIcons = () => {
    const context = useContext(IconsContext);
    if (context === undefined) {
        throw new Error('useIcons must be used within an IconsProvider');
    }
    return context;
};
