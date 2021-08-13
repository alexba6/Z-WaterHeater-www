import {ActionError, ActionStatus, StoreWithApiStatus} from "../typeStore";
import { TemperatureData} from "../../type/temperature";
import {isSameDay} from "../../tools/date";

type TemperatureError = ''

export type TemperatureDateData = {
    temperature: Array<TemperatureData>,
    date: Date
}

export type TemperatureReducerActions =
    ActionError<'temperature/error', TemperatureError>  |
    ActionStatus<'temperature/status'> |
    {
        type: 'temperature/load',
        temperatures: TemperatureDateData
    }

export interface TemperatureStore extends StoreWithApiStatus<TemperatureError>  {
    temperatures: Array<TemperatureDateData>
}

const initialState: TemperatureStore = {
    temperatures: [],
    status: 'INIT',
    error: null
}

export const temperatureReducer = (state: TemperatureStore = initialState, action: TemperatureReducerActions): TemperatureStore => {
    switch (action.type) {
        case 'temperature/load':
            for (const temperature of state.temperatures) {
                if (isSameDay(temperature.date, action.temperatures.date)) {
                    return state
                }
            }
            return {
                ...state,
                temperatures: [...state.temperatures, action.temperatures]
            }
        case 'temperature/error':
            return {
                ...state,
                ...action
            }
        case 'temperature/status':
            return {
                ...state,
                ...action
            }
    }
    return state
}
