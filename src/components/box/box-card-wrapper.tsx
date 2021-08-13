import { FunctionComponent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "../button/button";

import styles from './box-card-wrapper.module.sass'

type BoxCardWrapperProps = {
    buttons: Array<{
        name: string,
        onClick: () => void
    }>,
    icon: IconProp,
    focus: boolean
}

export const BoxCardWrapper: FunctionComponent<BoxCardWrapperProps> = (
    {
        children,
        buttons,
        icon,
        focus
    }) => {
    return <div className={styles.boxCardWrapperContainer} focus={focus ? 'focus' : undefined}>
        <div className={styles.boxCardWrapperIconFrame}>
            <FontAwesomeIcon icon={icon}/>
        </div>
        <div className={styles.boxCardWrapperContentFrame}>
            <div className={styles.boxCardWrapperChildrenFrame}>
                {children}
            </div>
            <div className={styles.boxCardWrapperButtonFrame}>
                {buttons.map(button => <Button key={button.name} onClick={button.onClick}>{button.name}</Button>)}
            </div>
        </div>
    </div>
}
