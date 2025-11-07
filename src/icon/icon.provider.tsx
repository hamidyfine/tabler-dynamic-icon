import type { PropsWithChildren } from 'react';
import { createContext } from 'react';

export interface IIconsContext {
    icons?: Record<string, any>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const IconsContext = createContext<IIconsContext | undefined>(undefined);

export const IconsProvider = ({ children, icons }: PropsWithChildren<IIconsContext>) => {
    return (
        <IconsContext.Provider value={{ icons }}>
            {children}
        </IconsContext.Provider>
    );
};
