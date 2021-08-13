import { TimeSlot } from "../../type/timeSlot";
import {ApiStatus, StoreWithApiStatus, StoreWithApiStatusError} from "../typeStore";

type ErrorTimeSlot = 'ERROR_LOAD' | 'ERROR_ADD' | 'ERROR_UPDATE'

type TimeSlotsReducerActions = {
    type: 'timeSlot/add'
        | 'timeSlot/delete',
    timeSlot: TimeSlot
} | {
    type: 'timeSlot/addMany'
        | 'timeSlot/load'
        | 'timeSlot/updateMany',
    timeSlots: Array<TimeSlot>
} | {
    type: 'timeSlot/error',
    error: StoreWithApiStatusError<ErrorTimeSlot>
} | {
    type: 'timeSlot/status',
    status: ApiStatus
}

export interface TimeSlotsStore extends StoreWithApiStatus<ErrorTimeSlot> {
    timeSlots: Array<TimeSlot>
}

const initialState: TimeSlotsStore = {
    status: 'INIT',
    error: null,
    timeSlots: []
}

export const timeSlotsReducer = (state: TimeSlotsStore = initialState, action: TimeSlotsReducerActions): TimeSlotsStore => {
    switch (action.type) {
        case 'timeSlot/add':
            return {
                ...state,
                timeSlots: [...state.timeSlots, action.timeSlot]
            }
        case 'timeSlot/delete':
            return {
                ...state,
                timeSlots: state.timeSlots.filter(timeSlot => timeSlot.id !== action.timeSlot.id)
            }
        case 'timeSlot/addMany':
            return {
                ...state,
                timeSlots: [...state.timeSlots, ...action.timeSlots]
            }
        case 'timeSlot/load':
            return {
                timeSlots: [...action.timeSlots],
                error: null,
                status: 'READY'
            }
        case 'timeSlot/updateMany':
            return {
                ...state,
                timeSlots: state.timeSlots.map(timeSlot => {
                    const find = action.timeSlots.find(updatedTimeSlot => updatedTimeSlot.id === timeSlot.id)
                    return find ? find : timeSlot
                })
            }
        case 'timeSlot/error':
            return {
                timeSlots: [...state.timeSlots],
                error: action.error,
                status: 'ERROR'
            }
        case 'timeSlot/status':
            return {
                timeSlots: [...state.timeSlots],
                error: state.error,
                status: action.status
            }
    }
    return state
}