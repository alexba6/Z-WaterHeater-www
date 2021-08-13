import {
    AriaAttributes,
    DOMAttributes
} from 'react'


declare module 'react' {
    export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        focus?: any,
        error?: any,
        hide?: any,
        margin?: any,
        open?: any,
        place?: any,
        activity?: any,
        position?: any,
        loading?: any
    }
}