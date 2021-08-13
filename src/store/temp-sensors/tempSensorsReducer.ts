import {ApiStatus, StoreWithApiStatus, StoreWithApiStatusError} from "../typeStore";
import {TempSensor} from "../../type/tempSensor";

type TempSensorStoreError = ''

type TempSensorReducerActions = {
    type: 'tempSensor/update',
    tempSensor: TempSensor
} | {
    type: 'tempSensor/load',
    tempSensors: Array<TempSensor>
} | {
    type: 'tempSensor/status',
    status: ApiStatus
} | {
    type: 'tempSensor/error',
    error: StoreWithApiStatusError<TempSensorStoreError>
}

export interface TempSensorStore extends StoreWithApiStatus<TempSensorStoreError> {
    tempSensors: Array<TempSensor>
}

const initialState: TempSensorStore = {
    tempSensors: [],
    status: 'INIT',
    error: null
}

export const tempSensorsReducer = (state: TempSensorStore = initialState, action: TempSensorReducerActions): TempSensorStore => {
    switch (action.type) {
        case 'tempSensor/update':
            return {
                ...state,
                tempSensors: state.tempSensors.map(tempSensor => {
                    if (tempSensor.id === action.tempSensor.id) {
                        return action.tempSensor
                    }
                    return tempSensor
                })
            }
        case 'tempSensor/load':
            return {
                tempSensors: [...action.tempSensors],
                status: 'READY',
                error: null
            }
        case 'tempSensor/status' || 'tempSensor/error':
            return {
                ...state,
                ...action,
                tempSensors: [...state.tempSensors]
            }
    }
    return state
}
