import { useEffect, useState } from 'react';

const THEMES = {
  light: 'light',
  dark: 'dark',
};

export const useTheme = () => {
  const [theme, setTheme] = useState<keyof typeof THEMES | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme && theme in THEMES) {
      setTheme(theme as keyof typeof THEMES);
    }
  }, []);

  const changeTheme = (theme: keyof typeof THEMES) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };

  if (theme && theme in THEMES) {
    document.getElementsByTagName('html')[0].dataset.theme = theme;
  }

  return {
    theme,
    changeTheme,
  };
};
