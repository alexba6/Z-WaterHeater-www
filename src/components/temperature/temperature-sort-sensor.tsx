import {FunctionComponent} from "react";
import {TempSensor} from "../../type/tempSensor";

import styles from './temperature-sort-sensor.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faThermometer,  faToggleOn} from "@fortawesome/free-solid-svg-icons";

type TemperatureSortSensorProps = {
    availableSensorsId: Array<string>,
    sortedSensorsId: Array<string>
    tempSensors: Array<TempSensor>,
    onToggle: (sensorId: string) => void,
    average: boolean,
    onToggleAverage: () => void
}

export const TemperatureSortSensor: FunctionComponent<TemperatureSortSensorProps> = (
    {
        availableSensorsId,
        sortedSensorsId,
        tempSensors,
        onToggle,
        average,
        onToggleAverage
    }
) => {

    return <div className={styles.tempSortContainer}>
        <table>
            <thead>
            <tr>
                <th>
                    <strong> <FontAwesomeIcon icon={faThermometer}/>Sonde</strong>
                </th>
                <th>
                    <strong> <FontAwesomeIcon icon={faToggleOn}/>Afficher</strong>
                </th>
            </tr>
            </thead>
            <tbody>
                {availableSensorsId.map(availableTempSensorId => {
                    return <tr key={availableTempSensorId}>
                        <td>
                            {tempSensors.find(tempSensor => tempSensor.id === availableTempSensorId)?.name ?? availableTempSensorId}
                        </td>
                        <td>
                            <input
                                type='checkbox'
                                checked={!!sortedSensorsId.find(sortedTempSensorId => sortedTempSensorId === availableTempSensorId)}
                                onChange={() => onToggle(availableTempSensorId)}
                            />
                        </td>
                    </tr>
                })}
                <tr>
                    <td>
                        <label>Average</label>
                    </td>
                    <td>
                        <input
                            type='checkbox'
                            checked={average}
                            onChange={onToggleAverage}
                        /></td>
                </tr>
            </tbody>
        </table>
    </div>
}
