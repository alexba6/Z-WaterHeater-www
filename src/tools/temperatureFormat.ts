import {TemperatureData} from "../type/temperature";
import {TempSensor} from "../type/tempSensor";



export const getAllSensorId = (temperatures: Array<TemperatureData>): Array<string> => {
    let temperatureSensorsId: Array<string> = []
    for (const temperaturesData of temperatures) {
        for (const temperatureData of temperaturesData.temp) {
            if (!temperatureSensorsId.find(id => id === temperatureData.sensorId)) {
                temperatureSensorsId.push(temperatureData.sensorId)
            }
        }
    }
    return temperatureSensorsId
}

export const getTemperatureDataHeader = (temperatureSensorsId: Array<string>,  tempSensors: Array<TempSensor>, enableTempAverage: boolean = false): Array<string> => {
    let header = [
        'Heures',
        ...temperatureSensorsId.map(temperatureSensorId => tempSensors.find(tempSensor => tempSensor.id === temperatureSensorId)?.name ?? temperatureSensorId)
    ]
    if (enableTempAverage) {
        header.push('Avarage')
    }
    return header
}

export const getTemperatureData = (temperatureSensorsId: Array<string>, temperatures: Array<TemperatureData>, enableTempAverage: boolean = false): Array<Array<string | number | null>> => {
    return temperatures.map(temperaturesData => {
        let tempValues = temperatureSensorsId.map(temperatureSensorId => temperaturesData.temp.find(tempData => tempData.sensorId === temperatureSensorId)?.value ?? null)
        if (enableTempAverage && tempValues.every(tempValue => tempValue !== null)) {
            const average = tempValues.reduce((a, b) => {
                if (a && b) {
                    return a + b
                }
                return a
            })
            tempValues.push(average ? average / tempValues.filter(tempValue => tempValue !== null).length : null)
        }
        return [
            temperaturesData.time,
            ...tempValues
        ]
    })
}


export const getFormatTemperatureDataChart = (temperatureSensorsId: Array<string>, tempSensors: Array<TempSensor>, temperatures: Array<TemperatureData>, enableTempAverage: boolean = false) => {
    return [
        getTemperatureDataHeader(temperatureSensorsId, tempSensors,  enableTempAverage),
        ...getTemperatureData(temperatureSensorsId, temperatures, enableTempAverage)
    ]
}

export const getTemperatureChartColor = (temperatureSensorsId: Array<string>,  tempSensors: Array<TempSensor>, enableTempAverage: boolean = false): Array<string> => {
    let colors = temperatureSensorsId.map(temperatureSensorId => tempSensors.find(tempSensor => tempSensor.id === temperatureSensorId)?.color ?? 'orange')
    if (enableTempAverage) {
        colors.push('orange')
    }
    return colors
}
