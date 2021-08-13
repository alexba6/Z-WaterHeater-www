

export type Temperature = {
    sensorId: string,
    value: number
}

export type TemperatureData = {
    temp: Array<Temperature>,
    time: string
}