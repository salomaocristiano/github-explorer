import React, { createContext, useCallback, useContext, useState } from 'react';

export interface ThemeState {
  theme: string;
}

interface ThemeContextData {
  theme: string;
  changeTheme(): void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ThemeState>(() => {
    const theme = localStorage.getItem('@GithubExplorer:theme');

    if (!theme) {
      return { theme: 'light' };
    }

    return { theme } as ThemeState;
  });

  const changeTheme = useCallback(() => {
    const theme = localStorage.getItem('@GithubExplorer:theme');

    const dataTheme: ThemeState = { theme: 'light' } as ThemeState;

    if (theme === 'light') {
      dataTheme.theme = 'dark';
    }

    setData(dataTheme);

    localStorage.setItem('@GithubExplorer:theme', dataTheme.theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: data.theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
}
