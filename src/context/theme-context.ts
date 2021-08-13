import { createContext } from "react";
import { colors } from '../config/color'

export type ThemeContextProps = {
    theme: 'dark' | 'light',
    toggle: () => void,
    colors: typeof colors
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggle: () => {},
    colors: colors
})