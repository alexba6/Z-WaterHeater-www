

export type LoginError = 'INVALID_CREDENTIAL'

export type ApiError<ErrorType> = {
    type: ErrorType | null,
    message: string
}
