import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import { createContext, useState } from "react";
import theme from '../theme';

export const ThemeContext=createContext(null);

const ThemeContextProvider=({children})=>{
    const [mode,setMode] = useState("light"); 
    const currentTheme=theme(mode);
    const toggleTheme =()=>{
        setMode((prev)=> (prev=='light'?'dark' :'light'));

    }


    return<>
     <ThemeContext.Provider value={{mode,toggleTheme}}>
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            {children}
            </ThemeProvider>
    
    </ThemeContext.Provider>
    </>
}
export default ThemeContextProvider ;
