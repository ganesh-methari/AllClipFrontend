import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const colors = {
    dark: {
      bg: '#0C0414',
      text: '#ffffff',
      primary: '#D043FF',
      card: '#1a1033',
      secondary: '#5F5F5F',
      border: 'rgba(255,255,255,0.1)'
    },
    light: {
      bg: '#ffffff',
      text: '#000000',
      primary: '#6366f1',
      card: '#f3f4f6',
      secondary: '#6b7280',
      border: 'rgba(0,0,0,0.1)'
    }
  };

  const currentColors = isDark ? colors.dark : colors.light;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors, currentColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
