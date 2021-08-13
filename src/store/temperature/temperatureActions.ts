import {StoreDispatch} from "../index";
import FetchApi from "../../api/http-fetch";
import {keyManager} from "../../tools/authKey";


export const loadTemperatureDay = (date: Date = new Date()) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'temperature/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        try {
            const isoDate = date.toISOString().split('T')[0]
            const temperatureData = await request.query('/api/temp', {
                method: 'get',
                auth: keyManager.key,
                query: {
                    date: isoDate
                }
            })
            dispatch({
                type: 'temperature/load',
                temperatures: {
                    temperature: temperatureData.data,
                    date
                }
            })
            dispatch({type: 'temperature/status', status: 'READY'})
        }
        catch (e) {
            dispatch({
                type: 'temperature/error',
                error: {
                    type: '',
                    message: String(await request.error())
                }
            })
        }
    }
}
