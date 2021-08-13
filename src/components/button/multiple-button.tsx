
import React, { FunctionComponent } from "react"

import styles from './multiple-button.module.sass'

type MultipleButtonConfig = {
    name: string,
    onClick: () => void,
    disable?: boolean
}

type MultipleButtonProps = {
    config: Array<MultipleButtonConfig>
}

type ButtonProps = {
    config: MultipleButtonConfig,
}

const Button: FunctionComponent<ButtonProps> = ({config}) => {
    const handleClick = () => {
        if (!config.disable) {
            config.onClick()
        }
    }
    return <div className={styles.btnContainer}>
        <button onClick={handleClick}>
            <div className={styles.btnInfoFrame}>
                <div
                    className={styles.btnInfoFrameMask}
                    activity={config.disable ? 'disable' : 'able'}>
                    {config.name}
                </div>
            </div>
        </button>
    </div>
}

const MultipleButton: FunctionComponent<MultipleButtonProps> = ({config}) => {
    return <div className={styles.multipleBtnContainer}>
        {
            config.map(buttonConfig => <Button
                config={buttonConfig}
                key={buttonConfig.name}
            />)
        }
    </div>
}

export {
    MultipleButton
}

export type {
    MultipleButtonConfig
}