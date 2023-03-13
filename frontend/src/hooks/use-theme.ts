import { useEffect, useState } from 'react';

const THEMES = {
  light: 'light',
  dark: 'dark',
  cupcake: 'cupcake',
  bumblebee: 'bumblebee',
  emerald: 'emerald',
  corporate: 'corporate',
  synthwave: 'synthwave',
  retro: 'retro',
  cyberpunk: 'cyberpunk',
  valentine: 'valentine',
  halloween: 'halloween',
  garden: 'garden',
  forest: 'forest',
  aqua: 'aqua',
  lofi: 'lofi',
  pastel: 'pastel',
  fantasy: 'fantasy',
  wireframe: 'wireframe',
  black: 'black',
  luxury: 'luxury',
  dracula: 'dracula',
  cmyc: 'cmyc',
  autumn: 'autumn',
  business: 'business',
  acid: 'acid',
  lemonade: 'lemonade',
  night: 'night',
  coffee: 'coffee',
  winter: 'winter',
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
    currentTheme: theme,
    changeTheme,
    themes: Object.keys(THEMES) as (keyof typeof THEMES)[],
  };
};
