import { createContext, type PropsWithChildren } from 'react';

export interface IconsContextValue {
    icons?: any;
}

// eslint-disable-next-line react-refresh/only-export-components
export const IconsContext = createContext<IconsContextValue>({ icons: undefined });

export const IconsProvider = ({ children, icons }: PropsWithChildren<{ icons?: any }>) => {
    return (
        <IconsContext.Provider value={{ icons }}>
            {children}
        </IconsContext.Provider>
    );
};
