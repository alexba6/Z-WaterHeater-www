export type ApiStatus = 'PENDING' | 'READY' | 'ERROR' | 'INIT'

export type StoreWithApiStatusError<ApiError> = {
    type: ApiError,
    message: string | null
} | null

export type StoreWithApiStatus<ApiError> = {
    status: ApiStatus,
    error: StoreWithApiStatusError<ApiError>
}


export type ActionError<ActionType, ApiError> = {
    type: ActionType,
    error: StoreWithApiStatusError<ApiError>
}

export type ActionStatus<ActionType> = {
    type: ActionType,
    status: ApiStatus
}