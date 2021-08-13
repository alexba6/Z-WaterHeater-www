import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {GlobalTemplate} from "../template/global-template";
import {Title} from "../components/box/box-structure";
import FetchApi from "../api/http-fetch";
import {keyManager} from "../tools/authKey";
import {Redirect} from "react-router-dom";


export const LogoutPage: FunctionComponent = () => {
    const [redirect, setRedirect] = useState(false)
    const logout = useCallback(async () => {
        const request = new FetchApi()
        try {
            await request.query('/api/auth/logout', {
                method: 'post',
                auth: keyManager.key
            })
        }
        finally {
            keyManager.removeKey()
            setRedirect(true)
        }
    }, [])
    useEffect(() => {
        logout().then()
    }, [logout])

    if (redirect) {
        return <Redirect to='/'/>
    }

    return <GlobalTemplate>
        <Title title='Logout...'/>
    </GlobalTemplate>
}