"use client";

import { useEffect } from "react";

export function Theming() {
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    // initial theme set
    if (
      localStorage.getItem("theme") === "dark" ||
      (localStorage.getItem("theme") === null && darkThemeMq.matches === true)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const themeChangeHandler = (e: MediaQueryListEvent) => {
      const theme = localStorage.getItem("theme");
      if (theme === null) {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    // listen for changes
    darkThemeMq.addEventListener("change", themeChangeHandler);

    // cleanup
    return () => {
      darkThemeMq.removeEventListener("change", themeChangeHandler);
    };
  }, []);
  return null;
}
