import {StoreDispatch, StoreState} from "../index";
import FetchApi from "../../api/http-fetch";
import {keyManager} from "../../tools/authKey";
import {TempSensor} from "../../api/type";


export const loadTempSensors = (forceReload: boolean=false) => {
    return async (dispatch: StoreDispatch, getState: StoreState) => {
        if (forceReload || getState().tempSensors.status !== 'READY') {
            dispatch({
                type: 'tempSensor/status',
                status: 'PENDING'
            })
            const request = new FetchApi()
            try {
                const tempSensorsData = await request.query('/api/sensor', {
                    method: 'get',
                    auth: keyManager.key
                })
                dispatch({
                    type: 'tempSensor/load',
                    tempSensors: tempSensorsData.sensors
                })
            }
            catch (e) {
                dispatch({
                    type: 'tempSensor/error',
                    error: {
                        type: '',
                        message: String(await request.error())
                    }
                })
            }
        }

    }
}

export const updateTempSensors = (tempSensors: Array<TempSensor>) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'tempSensor/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        try {
            for (const tempSensor of tempSensors) {
                await request.query('/api/sensor/{sensorId}', {
                    method: 'put',
                    auth: keyManager.key,
                    json: tempSensor,
                    params: {
                        sensorId: tempSensor.id
                    }
                })
                dispatch({ type: 'tempSensor/update', tempSensor })
                dispatch({
                    type: 'tempSensor/status',
                    status: 'READY'
                })
            }
        }
        catch (e) {
            dispatch({
                type: 'tempSensor/error',
                error: {
                    type: '',
                    message: String(await request.error())
                }
            })
        }
    }
}