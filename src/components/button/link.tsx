import React, {FunctionComponent, MouseEvent, useEffect, useState} from "react";
import { Link as RouterLink } from "react-router-dom";

import styles from './link.module.sass'

type LinkPops = {
    name: string,
    target: string,
    position?: 'left' | 'center' | 'right'
}


const Link: FunctionComponent<LinkPops> = ({name, target, position='left'}) => {
    return <div className={styles.linkContainer} position={position}>
        <RouterLink to={{
            pathname: target
        }}>
            {name}
        </RouterLink>
    </div>
}



type TimedLinkProps = {
    onClick: () => Promise<number> | number,
    label: string,
    description?: string
}

const TimedLink: FunctionComponent<TimedLinkProps> = ({onClick, label, description }) => {
    const [time, setTime] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            if (time > 0) {
                setTime(time - 1)
            }
        }, 1000)
        return () => clearInterval(timer)
    })

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        if (time === 0) {
            setTime(await onClick())
        }
    }



    return <div className={styles.timerLinkContainer}>
        {
            description ? <div className={styles.timerLinkDescriptionFrame}>
                <p>{description}</p>
            </div> : null
        }
        <div>
            <button
                onClick={handleClick}
                className={styles.timerLinkButtonFrame}>
                {
                    time > 0 ? <div className={styles.labelTimeFrameTimerLink}>
                            <label>{time} s</label>
                        </div> :
                        <div className={styles.labelFrameTimerLink}>
                            <label>{label}</label>
                        </div>
                }
            </button>
        </div>
    </div>
}


export {
    Link,
    TimedLink
}