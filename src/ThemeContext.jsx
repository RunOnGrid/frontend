import React, { createContext, useContext, useState, useEffect } from "react";

// Primero definimos el contexto
export const ThemeContext = createContext();

// Luego creamos el hook personalizado para usarlo
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Inicializa el estado con una función para leer localStorage
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar si estamos en el navegador (para evitar errores en SSR)
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme === "dark";
    }
    return false; // Valor predeterminado para SSR
  });

  // Actualiza localStorage cuando cambia el modo
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "dark" : "light"}>{children}</div>
    </ThemeContext.Provider>
  );
};
