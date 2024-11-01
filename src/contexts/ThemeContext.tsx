import React, { FunctionComponent, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { defaultThemeSettings } from '../config';
import palette from "../theme/palette";

// ----------------------------------------------------------------------

const initialState = {
    ...defaultThemeSettings,
    onChangeMode: (event: any) => {event},
    onToggleMode: () => {},
    setColor: {
        name: 'default',
        ...palette.light.primary
    },
    colorOption: [],
};

export const ThemeContext = createContext(initialState);

// type PropsWithChildren<P> = P & { children?: ReactNode };
type ThemeContextProps = {
    children: React.ReactNode;
}
export const ThemeContextProvider: FunctionComponent<ThemeContextProps> = ({children}) => {
    const [themeMode, setThemeMode] = useLocalStorage('themeSettings', initialState.themeMode);


    const onChangeMode = (event: any) => {
        setThemeMode(event.target.value);
    };

    const onToggleMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider
            value={{
                ...initialState,
                themeMode,
                onChangeMode,
                onToggleMode,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
};