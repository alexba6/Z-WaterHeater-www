import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {ThemeTemplate} from "../template/theme-template";
import {LoginBox} from "../components/login/login";
import FetchApi from "../api/http-fetch";
import {keyManager} from "../tools/authKey";
import { LoginError} from "../type/error";
import {useApi} from "../hooks/api";
import {Redirect} from "react-router-dom";


export const LoginPage: FunctionComponent = () => {
    const [redirect, setRedirect] = useState<string | null>(null)
    const [apiState, dispatchApi] = useApi<LoginError>({
        error: null,
        status: 'UNKNOWN'
    })

    const checkOldKey = useCallback(async () => {
        const request = new FetchApi()
        try {
            await request.query('/api/auth/key-check', {
                method: 'post',
                auth: keyManager.key
            })
            setRedirect('/temperature')
        }
        catch (e) {}
    }, [])

    const onConnect = async (login: string, password: string) => {
        dispatchApi({
            type: 'setStatus',
            status: 'PENDING'
        })
        dispatchApi({
            type: 'clearError'
        })
        const request = new FetchApi()
        try {
            keyManager.key = await request.query('/api/auth/login', {
                method: 'post',
                json: { login, password }
            })
            setRedirect('/temperature')
        }
        catch (e) {
            switch (await request.error()) {
                case 'INVALID_CREDENTIAL':
                    dispatchApi({
                        type: 'setError',
                        error: {
                            type: 'INVALID_CREDENTIAL',
                            message: 'Identifiant ou mot de passe incorrect !'
                        }
                    })
                    break
                default:
                    dispatchApi({
                        type: 'setError',
                        error: {
                            type: null,
                            message: 'Une erreur inattendue est survenue !'
                        }
                    })
                    break
            }
        }
    }

    useEffect(() => {
        checkOldKey().then()
    }, [checkOldKey])

    if (redirect) {
        return <Redirect to={redirect}/>
    }

    return <ThemeTemplate>
        <LoginBox
            onConnect={onConnect}
            error={apiState.error}
        />
    </ThemeTemplate>
}
