import { FunctionComponent, useEffect, useState } from 'react'
import { colors, darkColors } from '../config/color'
import { ThemeContext, ThemeContextProps } from '../context/theme-context'
import { getCurrentTheme, saveTheme } from '../tools/theme'
import {ThemeType} from "../type/theme";

export const ThemeTemplate: FunctionComponent = ({children}) => {
    const [theme, setTheme] = useState<ThemeType>(getCurrentTheme())

    const setDomColorProperty = (currentTheme: ThemeType) => {
        for (const [key, color] of Object.entries(currentTheme === 'dark' ? darkColors : colors)) {
            document.documentElement.style.setProperty(
                '--' + key.replace(/[A-Z]/g, l => '-'+l.toLowerCase()),
                color
            )
        }
    }

    useEffect(() => {
        setDomColorProperty(theme)
    }, [theme])

    const themeValue: ThemeContextProps = {
        theme: theme,
        toggle: () => {
            const newTheme = theme === 'dark' ? 'light' : 'dark'
            setTheme(newTheme)
            saveTheme(newTheme)
            setDomColorProperty(newTheme)
        },
        colors: theme === 'dark' ? darkColors : colors
    }

    return <ThemeContext.Provider value={themeValue}>
        {children}
    </ThemeContext.Provider>
}