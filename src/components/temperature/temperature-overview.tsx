import {FunctionComponent} from "react";
import {TempSensor} from "../../type/tempSensor";
import {TemperatureDateData} from "../../store/temperature/temperatureReducer";

import styles from './temperature-overview.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV, faThermometer, faThermometerThreeQuarters} from "@fortawesome/free-solid-svg-icons";

type TemperatureOverviewProps = {
    temperatures: TemperatureDateData | undefined,
    tempSensors: Array<TempSensor>
}

type TempFormat = {
    sensorName: string,
    lastTemp: number | undefined,
    deltaTemp: number | undefined
}

export const TemperatureOverview: FunctionComponent<TemperatureOverviewProps> = (
    {
        temperatures,
        tempSensors
    }
) => {

    let tempData: Array<TempFormat> = []

    if (temperatures && temperatures.temperature.length > 2) {
        const previousTemps = temperatures.temperature[temperatures.temperature.length - 2]
        const lastTemps = temperatures.temperature[temperatures.temperature.length - 1]
        tempData = lastTemps.temp.map(lastTemp => {
            const previousTemp = previousTemps.temp.find(previousTemp => previousTemp.sensorId === lastTemp.sensorId)
            return {
                sensorName: tempSensors.find(tempSensor => tempSensor.id === lastTemp.sensorId)?.name ?? lastTemp.sensorId,
                lastTemp: lastTemp.value,
                deltaTemp: previousTemp && Math.round( (lastTemp.value - previousTemp.value) * 100) / 100
            }
        })
    }

    return <div className={styles.tempOverviewContainer}>
        <table>
            <thead>
                <tr>
                    <th>
                        <strong> <FontAwesomeIcon icon={faThermometer}/>Sonde</strong>
                    </th>
                    <th>
                        <strong> <FontAwesomeIcon icon={faArrowsAltV}/>Diff</strong>
                    </th>
                    <th>
                        <strong> <FontAwesomeIcon icon={faThermometerThreeQuarters}/>Température</strong>
                    </th>
                </tr>
            </thead>
            <tbody>
            {tempData.map(temp => {
                return <tr key={temp.sensorName}>
                    <td>
                        <label>{temp.sensorName}</label>
                    </td>
                    <td>
                        <label>{temp.deltaTemp} ° C</label>
                    </td>
                    <td>
                        <label>{temp.lastTemp} ° C</label>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}