import React, {
    useState,
    useRef,
    useEffect,
    ChangeEvent,
    FunctionComponent,
    KeyboardEvent, ReactElement
} from 'react'

import styles from './code-input.module.sass'

const InputCode: FunctionComponent<{
    length: number,
    onComplete: (code: string) => any,
    loading?: boolean,
    label?: ReactElement | string,
    error?: string
}> = ({ length, onComplete, loading=false, label, error }) => {
    const [code, setCode] = useState([...Array(length)].map(() => ""))
    const inputs = useRef<(HTMLInputElement | null)[]>([])

    const onChangeCode = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        const value = event.target.value
        const newCode = [...code]
        newCode[id] = value[value.length - 1]
        setCode(newCode)
        if (id !== length - 1 && value !== '') {
            inputs.current[id + 1]?.focus()
        }
        if (newCode.every(num => num?.length > 0)) {
            onComplete(newCode.join(''))
        }
    }

    const onKeyUp = (event: KeyboardEvent, id: number) => {
        if (event.code === 'Backspace' && !code[id] && id !== 0) {
            const newCode = [...code]
            newCode[id - 1] = ''
            setCode(newCode)
            inputs.current[id - 1]?.focus()
        }
    }

    useEffect(() => {
        inputs.current[0]?.focus()
    }, [])

    return <div className={styles.codeInputContainer}>
        {label ? <div className={styles.labelContainer}>{label}</div> : undefined}
        {error ? <div className={styles.codeInputErrorFrame}>
            <p>{error}</p>
        </div> : undefined}
        <div className={styles.codeContainer}>
            {code.map((value, id) =>
                <div className={styles.codeFrame} key={id}>
                    <input
                        value={value}
                        onChange={e => onChangeCode(e, id)}
                        ref={ref => inputs.current.push(ref)}
                        readOnly={loading}
                        onKeyUp={e => onKeyUp(e, id)}
                    />
                </div>
            )}
        </div>
    </div>

}

export { InputCode }