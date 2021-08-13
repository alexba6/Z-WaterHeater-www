import React, {FunctionComponent, ChangeEvent, useState, forwardRef} from 'react'

import styles from './input.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";


type TextPros = {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => any,
    placeholder?: string,
    type?: any,
    icon?: IconProp,
    error?: string | undefined | boolean,
    value?: string,
    readonly?: boolean,
    defaultValue?: any
}

export const InputRef = forwardRef<any, TextPros>((
    {
        placeholder,
        type='text',
        error,
        icon=undefined,
        readonly,
        defaultValue
    },
    ref
) => {
    const [focus, setFocus] = useState(false)

    return <div className={styles.inputTextContainer} >
        {
            typeof error == 'string' && error.length > 0 ?
                <div className={styles.errorFrame}>
                    <p>{error}</p>
                </div>
                : null
        }
        <div className={styles.inputTextMask} focus={focus ? 'focus' : undefined} error={error ? 'error' : undefined}>
            {
                icon ?
                    <div className={styles.inputTextIconFrame}>
                        <FontAwesomeIcon icon={icon}/>
                    </div>
                    : null
            }
            <div className={styles.inputTextInputFrame}>
                {
                    <input
                        type={type}
                        placeholder={placeholder}
                        readOnly={readonly}
                        ref={ref}
                        onFocus={() => {
                            if (!readonly) {
                                setFocus(true)
                            }
                        }}
                        onBlur={() => {
                            setFocus(false)
                        }}
                        defaultValue={defaultValue}
                    />
                }

            </div>
        </div>
    </div>
})
export const Input : FunctionComponent<TextPros> = ({placeholder, onChange,  type='text', value='', error, icon=undefined, readonly}) => {
    const [focus, setFocus] = useState(false)

    return <div className={styles.inputTextContainer} >
        {
            typeof error == 'string' && error.length > 0 ?
                <div className={styles.errorFrame}>
                    <p>{error}</p>
                </div>
                : null
        }
        <div className={styles.inputTextMask} focus={focus ? 'focus' : undefined} error={error ? 'error' : undefined}>
            {
                icon ?
                    <div className={styles.inputTextIconFrame}>
                        <FontAwesomeIcon icon={icon}/>
                    </div>
                    : null
            }
            <div className={styles.inputTextInputFrame}>
                {
                    <input
                        type={type}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        readOnly={readonly}
                        onFocus={() => {
                            if (!readonly) {
                                setFocus(true)
                            }
                        }}
                        onBlur={() => {
                            setFocus(false)
                        }}
                    />
                }

            </div>
        </div>
    </div>
}
