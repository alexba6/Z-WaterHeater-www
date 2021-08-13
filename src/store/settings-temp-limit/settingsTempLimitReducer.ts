import {ApiStatus, StoreWithApiStatus, StoreWithApiStatusError} from "../typeStore";
import {SettingsTempLimit} from "../../type/settings";


type SettingsTempLimitError = ''

export type SettingTempLimitActions = {
    type: 'settingsTempLimit/status',
    status: ApiStatus
} | {
    type: 'settingsTempLimit/error',
    error: StoreWithApiStatusError<SettingsTempLimitError>
} | {
    type: 'settingsTempLimit/load',
    settingsTempLimit: SettingsTempLimit
} | {
    type: 'settingsTempLimit/update',
    settingsTempLimit: SettingsTempLimit
}

export interface SettingsTempLimitStore extends StoreWithApiStatus<SettingsTempLimitError>  {
    settingsTempLimit: SettingsTempLimit | null
}

const initialState: SettingsTempLimitStore = {
    status: 'INIT',
    error: null,
    settingsTempLimit: null
}

export const settingsTempLimitReducer = (state: SettingsTempLimitStore = initialState, action: SettingTempLimitActions): SettingsTempLimitStore => {
    switch (action.type) {
        case 'settingsTempLimit/load':
            return {
                ...state,
                settingsTempLimit: action.settingsTempLimit
            }
        case 'settingsTempLimit/update':
            return {
                ...state,
                settingsTempLimit: {
                    ...state.settingsTempLimit,
                    ...action.settingsTempLimit
                }
            }
        case 'settingsTempLimit/error':
            return {
                ...state,
                status: 'ERROR',
                error: action.error
            }
        case 'settingsTempLimit/status':
            return {
                ...state,
                status: action.status
            }
    }
    return state
}
