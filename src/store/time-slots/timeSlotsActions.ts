import {StoreDispatch, StoreState} from "../index";
import FetchApi from "../../api/http-fetch";
import {keyManager} from "../../tools/authKey";
import {TimeSlot, TimeSlotWithoutId} from "../../type/timeSlot";

export const loadTimeSlots = (forceReload: boolean = false) => {
    return async (dispatch: StoreDispatch, getState: StoreState) => {
        if (forceReload || getState().timeSlots.status !== ('READY' || 'PENDING')) {
            dispatch({
                type: 'timeSlot/status',
                status: 'PENDING'
            })
            const request = new FetchApi()
            try {
                const timeSlotsData = await request.query('/api/time-slot', {
                    method: 'get',
                    auth: keyManager.key
                })
                dispatch({
                    type: 'timeSlot/load',
                    timeSlots: timeSlotsData.timeSlots
                })
            }
            catch (e) {
                dispatch({
                    type: 'timeSlot/error',
                    error: {
                        type: 'ERROR_LOAD',
                        message: String(await request.error())
                    }
                })
            }
        }
    }
}


export const updateTimeSlots = (timeSlots: Array<TimeSlot>) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'timeSlot/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        await request.query('/api/time-slot', {
            method: 'put',
            auth: keyManager.key,
            json: timeSlots
        })
        dispatch({type: 'timeSlot/updateMany', timeSlots})
        dispatch({
            type: 'timeSlot/status',
            status: 'READY'
        })
    }
}

export const deleteTimeSlot = (timeSlot: TimeSlot) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'timeSlot/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        await request.query('/api/time-slot/{timeSlotId}', {
            method: 'delete',
            auth: keyManager.key,
            params: {
                timeSlotId: timeSlot.id
            }
        })
        dispatch({ type: 'timeSlot/delete', timeSlot })
        dispatch({
            type: 'timeSlot/status',
            status: 'READY'
        })
    }
}

export const addTimeSlot = (timeSlot: TimeSlotWithoutId) => {
    return async (dispatch: StoreDispatch) => {
        dispatch({
            type: 'timeSlot/status',
            status: 'PENDING'
        })
        const request = new FetchApi()
        try {
            const timeSlotData = await request.query('/api/time-slot', {
                method: 'post',
                auth: keyManager.key,
                json: timeSlot
            })
            dispatch({type: 'timeSlot/add', timeSlot: timeSlotData.timeSlot })
            dispatch({
                type: 'timeSlot/status',
                status: 'READY'
            })
        }
        catch (e) {
            dispatch({
                type: 'timeSlot/error',
                error: {
                    type: 'ERROR_ADD',
                    message: String(await request.error())
                }
            })
        }
    }
}

export const clearTimeSlotError = (dispatch: StoreDispatch) => {
    dispatch({type: 'timeSlot/status', error: null, status: 'READY'})
}