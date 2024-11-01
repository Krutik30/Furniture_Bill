import React, { FC, useContext, useMemo, ReactNode } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import shadows, { customShadows } from "./shadows";
import ComponentsOverrides from "./overrides";
// @mui
import { createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeProviderProps {
  children: ReactNode; // Define children prop
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { themeMode } = useContext(ThemeContext);
  const isLight = themeMode === 'light';

  const themeOptions: any = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: 'ltr',
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children} {/* Render children */}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
