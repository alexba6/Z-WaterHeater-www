import React, {FunctionComponent, useState} from 'react'

import { ThemeTemplate } from './theme-template'
import { NavBarContext } from '../context/nav-bar-context'
import { Header } from '../components/header/header'
import { NavBar } from '../components/nav-bar/nav-bar'
import { NavBarConfig } from '../config/nav-bar'

import styles from './global-template.module.sass'

export const GlobalTemplate: FunctionComponent = ({children}) => {
    const [displayMenu, setDisplayMenu] = useState(false)

    return <ThemeTemplate>
        <NavBarContext.Provider value={{
            display: displayMenu,
            toggleDisplay: () => setDisplayMenu(!displayMenu)
        }}>
            <Header/>
            <NavBar navbarSchema={NavBarConfig}/>
            <div
                className={styles.innerContentFrame}
                activity={displayMenu ? 'disable' : 'able'}
                onClick={event => {
                    if(displayMenu) {
                        event.preventDefault()
                        event.stopPropagation()
                        event.nativeEvent.stopImmediatePropagation()
                        setDisplayMenu(false)
                    }
                }}>
                {children}
            </div>
        </NavBarContext.Provider>
    </ThemeTemplate>
}
