import type { PropsWithChildren } from 'react';
import { createContext } from 'react';

export interface IIconsContext {
    icons: Record<string, any>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const IconsContext = createContext<IIconsContext | undefined>(undefined);

interface IIconsProviderProps extends PropsWithChildren {
    icons: Record<string, any>;
}

export const IconsProvider = ({ children, icons }: IIconsProviderProps) => {
    return (
        <IconsContext.Provider value={{ icons }}>
            {children}
        </IconsContext.Provider>
    );
};
