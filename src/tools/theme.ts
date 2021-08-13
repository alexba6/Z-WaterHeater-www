import { ThemeType } from '../type/theme'

export const saveTheme = (theme: ThemeType) : void => {
    localStorage.setItem('theme', theme)
}

export const getCurrentTheme = () : ThemeType => localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
