import { OutputGroup } from "../../type/outputGroup"
import {ApiStatus, StoreWithApiStatus, StoreWithApiStatusError} from "../typeStore";

type OutputGroupError = 'ERROR_LOAD'

type OutputGroupsReducerActions = {
    type: 'outputGroup/add'
        | 'outputGroup/update'
        | 'outputGroup/delete',
    outputGroup: OutputGroup
} |  {
    type: 'outputGroup/addMany'
        | 'outputGroup/load'
    outputGroups: Array<OutputGroup>
} | {
    type: 'outputGroup/status',
    status: ApiStatus
} | {
    type: 'outputGroup/error',
    error: StoreWithApiStatusError<OutputGroupError>
}

export interface OutputGroupsStore extends StoreWithApiStatus<OutputGroupError> {
    outputGroups: Array<OutputGroup>
}

const initialState: OutputGroupsStore = {
    outputGroups: [],
    status: 'INIT',
    error: null
}

export const outputGroupsReducer = (state: OutputGroupsStore = initialState, action: OutputGroupsReducerActions): OutputGroupsStore => {
    switch (action.type) {
        case 'outputGroup/add':
            return {
                ...state,
                outputGroups: [...state.outputGroups, action.outputGroup]
            }
        case 'outputGroup/update':
            return {
                ...state,
                outputGroups: state.outputGroups.map(outputGroup => {
                    if (outputGroup.id === action.outputGroup.id) {
                        return action.outputGroup
                    }
                    return outputGroup
                })
            }
        case 'outputGroup/delete':
            return {
                ...state,
                outputGroups: state.outputGroups.filter(outputGroup => outputGroup.id !== action.outputGroup.id)
            }
        case 'outputGroup/addMany':
            return {
                ...state,
                outputGroups: [...state.outputGroups, ...action.outputGroups]
            }
        case 'outputGroup/load':
            return {
                outputGroups: [...action.outputGroups],
                status: 'READY',
                error: null
            }
        case 'outputGroup/status':
            return { ...state, status: action.status }
        case 'outputGroup/error':
            return { ...state, error: action.error, status: 'ERROR' }
    }
    return state
}