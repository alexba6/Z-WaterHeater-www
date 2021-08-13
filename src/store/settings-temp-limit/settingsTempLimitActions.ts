import {StoreDispatch, StoreState} from "../index";
import FetchApi from "../../api/http-fetch";
import {keyManager} from "../../tools/authKey";
import {SettingsTempLimit} from "../../type/settings";


export const loadSettingsTempLimit = (forceReload: boolean = false) => {
    return async (dispatch: StoreDispatch, getState: StoreState) => {
        if (forceReload || !getState().settingsTempLimit.settingsTempLimit) {
            dispatch({
                type: 'settingsTempLimit/status',
                status: 'PENDING'
            })
            const request = new FetchApi()
            try {
                const settingsTempLimit = await request.query('/api/settings/temp-limit', {
                    method: 'get',
                    auth: keyManager.key
                })
                dispatch({ type: 'settingsTempLimit/load', settingsTempLimit })
                dispatch({
                    type: 'settingsTempLimit/status',
                    status: 'READY'
                })
            }
            catch (e) {
                dispatch({
                    type: 'settingsTempLimit/error',
                    error: {
                        type: '',
                        message: String(await request.error())
                    }
                })
            }
        }
    }
}

export const updateSettingsTempLimit = (settingsTempLimit: SettingsTempLimit) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'settingsTempLimit/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        try {
            await request.query('/api/settings/temp-limit', {
                method: 'put',
                auth: keyManager.key,
                json: settingsTempLimit
            })
            dispatch({ type: 'settingsTempLimit/update',  settingsTempLimit })
            dispatch({
                type: 'settingsTempLimit/status',
                status: 'READY'
            })
        }
        catch (e) {
            dispatch({
                type: 'settingsTempLimit/error',
                error: {
                    type: '',
                    message: String(await request.error())
                }
            })
        }
    }
}