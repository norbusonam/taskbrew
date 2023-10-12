import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "dark" || localTheme === "light") {
      setTheme(localTheme as "light" | "dark");
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      if (theme === "dark") {
        // explicitly set dark mode
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else if (theme === "light") {
        // explicitly set light mode
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      } else if (theme === "system") {
        // explicity or implicitly set auto mode
        localStorage.removeItem("theme");
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }
    // only needs to run on theme change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
