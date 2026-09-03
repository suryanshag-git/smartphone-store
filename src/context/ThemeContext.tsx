'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'pearl' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('pearl');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('slate_theme') as Theme;
      if (savedTheme === 'dark' || savedTheme === 'pearl') {
        setTheme(savedTheme);
      }
    } catch (e) {
      console.error('Failed to load theme preference:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('slate_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Failed to save theme preference:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'pearl' ? 'dark' : 'pearl'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
