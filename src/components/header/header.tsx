import React, { FunctionComponent, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { NavBarContext } from '../../context/nav-bar-context'
import { ThemeContext } from '../../context/theme-context'
import {faBars, faLightbulb, faMoon,  faTimes} from "@fortawesome/free-solid-svg-icons"

import styles from './header.module.sass'

const Header: FunctionComponent = () => {
    const navBar = useContext(NavBarContext)
    const theme = useContext(ThemeContext)

    return <header className={styles.header}>
        <div className={styles.headerContainer}>
            <div className={styles.toggleButtonFrame}>
                <button onClick={() => navBar.toggleDisplay()}>
                    <FontAwesomeIcon icon={navBar.display ? faTimes : faBars}/>
                </button>
            </div>
            <div className={styles.appNameFrame}>
                <h1>Z-WaterHeater</h1>
            </div>
            <div className={styles.headerButtonThemeFrame}>
                <button onClick={theme.toggle}>
                    <FontAwesomeIcon icon={theme.theme === 'dark' ? faLightbulb : faMoon}/>
                </button>
            </div>
        </div>
    </header>
}

export {
    Header
}