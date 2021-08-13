import React, {FunctionComponent, useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import styles from './action.module.sass'
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export type SimpleActionProps = {
    name: string,
    icon?: IconProp,
    confirmMessage?: string,
    onClick: () => void
}

const SimpleAction: FunctionComponent<SimpleActionProps> = ({name, icon, confirmMessage, onClick} ) => {
    const handleClick = () => {
        if (confirmMessage) {
            if (!window.confirm(confirmMessage)) {
                return
            }
        }
        onClick()
    }

    return <div className={styles.simpleActionContainer}>
        <button onClick={handleClick}>
            <div className={styles.simpleActionContentFrame}>
                <div className={styles.simpleActionIconFrame}>
                    {icon ? <FontAwesomeIcon icon={icon}/> : null}
                </div>
                <div className={styles.simpleActionNameFrame}>
                    <label>
                        {name}
                    </label>
                </div>
            </div>
        </button>
    </div>
}

type ActionProps = {
    actions: Array<SimpleActionProps>
}

const Action: FunctionComponent<ActionProps> = ({actions}) => {
    const [showAction, setShowAction] = useState(false)

    const handleClickDisplay = () => {
        setShowAction(!showAction)
    }

    const handleClickAction = (onClick: () => void): () => void => {
        return () => {
            onClick()
            setShowAction(false)
        }
    }

    return <div className={styles.actionContainer}>
        <div className={styles.actionEndpointFrame}>
            {
                showAction ?
                <div className={styles.actionFrame}>
                    {
                        actions.map(action => <SimpleAction
                            key={action.name}
                            name={action.name}
                            onClick={handleClickAction(action.onClick)}
                            icon={action.icon}
                            confirmMessage={action.confirmMessage}
                        />)
                    }
                </div> : null
            }
        </div>

        <div className={styles.actionBtnFrame}>
            <button onClick={handleClickDisplay}>
                <FontAwesomeIcon icon={faEllipsisH}/>
            </button>
        </div>
    </div>
}

export { Action }