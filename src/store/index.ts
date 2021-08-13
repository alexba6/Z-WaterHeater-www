import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { outputGroupsReducer } from './output-groups/outputGroupsReducer'
import {timeSlotsReducer} from "./time-slots/timeSlotsReducer";
import {tempSensorsReducer} from "./temp-sensors/tempSensorsReducer";
import {temperatureReducer} from "./temperature/temperatureReducer";
import {settingsTempLimitReducer} from "./settings-temp-limit/settingsTempLimitReducer";

export const store = createStore(
    combineReducers({
        outputGroups: outputGroupsReducer,
        timeSlots: timeSlotsReducer,
        tempSensors: tempSensorsReducer,
        temperature: temperatureReducer,
        settingsTempLimit: settingsTempLimitReducer
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)


export type StoreState = typeof store.getState
export type StoreDispatch = typeof store.dispatch