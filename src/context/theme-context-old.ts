
import { createContext } from 'react'
import {colors} from "../config/color";

export default createContext({
    dark: false,
    toggleTheme: () => {},
    colors: colors
})

