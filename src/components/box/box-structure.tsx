import React, { FunctionComponent } from 'react'

import styles from './box-structure.module.sass'

type BoxProps = {
    title?: string,
    description?: string,
    loading?: boolean
}

export const Box: FunctionComponent<BoxProps> = ({title, description, children, loading}) => {
    return <div className={styles.boxContainer} >
        {title ? <div className={styles.boxTitleFrame}>
            <h3>{title}</h3>
        </div> : null}
        {description ? <div className={styles.boxDescriptionFrame}>
            <p>{description}</p>
        </div> : null}
        <div className={styles.boxContentFrame}>
            {loading ? <div className={styles.boxLoadingContainer}>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div> : children}
        </div>
    </div>
}

export const Title: FunctionComponent<{title: string}> = ({title}) => {
    return <div className={styles.titleContainer}>
        <h2>{title}</h2>
    </div>
}