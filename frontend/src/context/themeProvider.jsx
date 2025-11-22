import { useEffect } from "react";
import { createContext, useContext, useState } from "react";


const ThemeContext = createContext();

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false); 

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme', 
            darkMode ? 'dark' : 'light'
        );
    }, [darkMode]);
        
    return (
        <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}