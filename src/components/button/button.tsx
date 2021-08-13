
import React, { FunctionComponent, MouseEvent } from 'react'

import styles from './button.module.sass'

type ButtonProps = {
    onClick: (event: MouseEvent<HTMLElement>) => any,
    disable?: boolean
}


const SimpleButton: FunctionComponent<ButtonProps> = ({ onClick, disable=false, children }) => {
    const handleClick = (event: MouseEvent<HTMLElement>) : void => {
        onClick(event)
    }

    return <div className={styles.simpleButtonContainer}>
        <button onClick={handleClick} activity={disable ? 'disable' : 'able'}>
            {children}
        </button>
    </div>
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, disable=false, children }) => {
    const handleClick = (event: MouseEvent<HTMLElement>) : void => {
        onClick(event)
    }

    return <button onClick={handleClick} activity={disable ? 'disable' : 'able'} className={styles.button}>
            {children}
        </button>
}


export {
    SimpleButton,
    Button
}
