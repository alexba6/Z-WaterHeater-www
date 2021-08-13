

export type TempSensor = {
    id: string,
    name: string,
    color: string | null,
    alive: boolean,
    displayOnScreen: boolean,
}

export type TempSensorSU = {
    store: TempSensor,
    updated: TempSensor
}