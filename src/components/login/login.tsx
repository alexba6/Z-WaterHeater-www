import { FunctionComponent, useRef} from "react";
import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {ApiError, LoginError} from "../../type/error";
import {InputRef} from "../input/input";

import styles from './login.module.sass'

type LoginBoxProps = {
    onConnect: (login: string, password: string) => void,
    error: ApiError<LoginError> | null
}


export const LoginBox: FunctionComponent<LoginBoxProps> = (
    {
        onConnect,
        error
    }
) => {
    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const handleConnect = () => {
        if (!loginRef.current || !passwordRef.current) return
        onConnect(loginRef.current.value, passwordRef.current.value)
    }


    return <div className={styles.loginContainer} onKeyDown={(e) => {
        if (e.key === 'Enter') {
            handleConnect()
        }
    }}>
        <div className={styles.loginFrame}>
            <div className={styles.loginHeaderFrame}>
                <h1>Connexion</h1>
            </div>
            <div className={styles.loginContentFrame}>
                <div className={styles.loginInputFrame}>
                    <InputRef
                        icon={faUser}
                        type='text'
                        ref={loginRef}
                        error={error?.type === 'INVALID_CREDENTIAL'}
                        placeholder='Email...'
                    />
                </div>
                <div className={styles.loginInputFrame}>
                    <InputRef
                        icon={faKey}
                        type='password'
                        ref={passwordRef}
                        error={error?.type === 'INVALID_CREDENTIAL'}
                        placeholder='Mot de passe...'
                    />
                </div>
                <div className={styles.loginErrorFrame}>
                    {error?.message && <label>{error.message}</label>}
                </div>
            </div>
            <div className={styles.loginFooterFrame}>
                <button onClick={handleConnect}>
                    Connexion
                </button>
            </div>
        </div>
    </div>
}