import { useState } from "react";
import { ApiError } from "../type/error";

type ApiStatus = 'PENDING' | 'READY' | 'ERROR' | 'UNKNOWN'

type ApiReducerAction<E> = {
    type: 'setStatus',
    status: ApiStatus
} | {
    type: 'setError',
    error: ApiError<E>
} | {
    type: 'clearError'
}

type ApiReducer<E> = {
    status: ApiStatus,
    error: ApiError<E> | null
}

const apiErrorReducer = <E>(state: ApiReducer<E>, action: ApiReducerAction<E>): ApiReducer<E> => {
    switch (action.type) {
        case 'setStatus':
            return {
                ...state,
                status: action.status
            }
        case 'setError':
            return {
                status: 'ERROR',
                error: action.error
            }
        case 'clearError':
            return {
                status: state.status === 'ERROR' ? 'UNKNOWN' : state.status,
                error: null
            }
    }
    return state
}


export const useApi = <E>(defaultState: ApiReducer<E>): [ApiReducer<E>, (payload: ApiReducerAction<E>) => void] => {
    const [state, setState] = useState<ApiReducer<any>>(defaultState)
    return [
        state,
        (payload: ApiReducerAction<any>) => {
            setState(apiErrorReducer(state, payload))
        }
    ]
}
