import {strict} from "assert";


export type OutGroup = {
    id: string,
    name: string,
    outId: Array<string>
}

export type AuthToken = {
    token: string
}

export type AuthKey = {
    key: string,
    keyId: string
}

export type KeyInfo = {
    id: string,
    ip: string,
    userAgent: string,
    createdAt: Date,
    lastGenerated: Date
}

export type ControlMode = 'ON' | 'OFF' | 'AUTO'



export type TempSensor = {
    id: string,
    name: string,
    alive: boolean,
    color: string | null,
    displayOnScreen: boolean
}

export type TimeSlot = {
    id: string,
    groupId: string,
    start: string,
    end: string
}