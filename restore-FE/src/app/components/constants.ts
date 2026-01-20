import type { Theme } from "@mui/material";
import { createTheme } from "@mui/material";

export const getThemePreferences = (isDarkMode: boolean): Theme => {
  return createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      background: { default: isDarkMode ? "#121212" : "#ffffff" },
      primary: {
        main: isDarkMode ? "#90caf9" : "#063F88",
      },
      secondary: {
        main: isDarkMode ? "#f48fb1" : "#3D82DA",
      },
    },
  });
};
