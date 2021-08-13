
import React, {createContext, FunctionComponent, useContext, useState} from 'react'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";

import styles from './nav-bar.module.sass'

import {NavBarContext} from '../../context/nav-bar-context'
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const RedirectContext = createContext({
    to: (target: string) => {}
})

interface SingleLinkOptions {
    name: string,
    target: string,
    icon?: IconProp
}

interface MultipleLinkOptions {
    name: string,
    icon?: IconProp,
    singleLinks: Array<SingleLinkOptions>
}

interface SeparatorOptions {
    name: string
}

export type NavBarSchema = {
    type: 'single',
    options: SingleLinkOptions
} | {
    type: 'multiple',
    options: MultipleLinkOptions
} | {
    type: 'separator',
    options: SeparatorOptions
}

type NavBarSchemaProps = {
    navbarSchema: Array<NavBarSchema>
}


const SingleLink: FunctionComponent<{linkOptions: SingleLinkOptions, margin?: boolean}> = ({linkOptions, margin}) => {
    const redirect = useContext(RedirectContext)
    const handleClick = () => {
        redirect.to(linkOptions.target)
    }
    return <div className={styles.singleLink} onClick={handleClick} margin={margin ? 'b' : 's'}>
        { linkOptions.icon ?
            <div className={styles.iconLink}>
                {linkOptions.icon && <FontAwesomeIcon icon={linkOptions.icon}/> }
            </div> : null
        }
        <div className={styles.textLink}>
            <label>
                { linkOptions.name }
            </label>
        </div>
    </div>
}

const MultipleLink: FunctionComponent<{linksOptions: MultipleLinkOptions}> = ({linksOptions}) => {
    const [display, setDisplay] = useState(false)

    const changeDisplay = () => {
        setDisplay(!display)
    }

    return <div>
        <div className={styles.multipleLinkButtonFrame} onClick={changeDisplay}>
            { linksOptions.icon ?
                <div className={styles.iconLink}>
                    {linksOptions.icon && <FontAwesomeIcon icon={linksOptions.icon}/> }
                </div> : null
            }
            <div className={styles.textLink}>
                <label>{linksOptions.name}</label>
            </div>
            <div className={styles.multipleLinkChevron} open={display ? 'open' : undefined}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </div>
        </div>
        <div style={{maxHeight: `${70 * (display ? linksOptions.singleLinks.length : 0)}px`}} className={styles.multipleLinkContent}>
            {
                linksOptions.singleLinks.map((singleLink: SingleLinkOptions) => <SingleLink linkOptions={singleLink} key={singleLink.name} margin={true}/>)
            }
        </div>
    </div>
}

const Separator: FunctionComponent<{separatorOptions?: SeparatorOptions}> = ({separatorOptions}) => {
    return <div className={styles.separatorContainer}>
        <label>
            {separatorOptions?.name}
        </label>
    </div>
}

const NavBar: FunctionComponent<NavBarSchemaProps> = ({navbarSchema}) => {
    const navBar = useContext(NavBarContext)
    let history = useHistory()

    const redirectValue = {
        to: (target: string) => history.push(target)
    }

    const getSchemaPart = (schema: NavBarSchema) => {
        switch (schema.type) {
            case 'single': return <SingleLink key={schema.options.name} linkOptions={schema.options}/>
            case 'multiple': return <MultipleLink key={schema.options.name} linksOptions={schema.options}/>
            case 'separator': return <Separator key={schema.options.name} separatorOptions={schema.options}/>
        }
    }

    return <RedirectContext.Provider value={redirectValue}>
        <div className={styles.navBarContainer} hide={!navBar.display ? 'hide' : undefined}>
            {navbarSchema.map(schema => getSchemaPart(schema))}
        </div>
    </RedirectContext.Provider>
}



export {
    NavBar,
    SingleLink,
    MultipleLink,
    Separator
}