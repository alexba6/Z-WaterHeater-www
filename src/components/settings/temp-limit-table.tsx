import React, {FunctionComponent, useRef} from "react";
import {SettingsTempLimit} from "../../type/settings";
import {TempSensor} from "../../type/tempSensor";
import {Button} from "../button/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import styles from './temp-limit-table.module.sass'
import {faArrowsAltV, faTemperatureHigh, faThermometer} from "@fortawesome/free-solid-svg-icons";
import {faBell} from "@fortawesome/free-regular-svg-icons";

type TempLimitTableProps = {
    settingsTempLimit: SettingsTempLimit | null,
    onUpdate: (settingsTempLimit: SettingsTempLimit) => void,
    tempSensors: Array<TempSensor>,
    error: string | undefined | null
}

export const TempLimitTable: FunctionComponent<TempLimitTableProps> = (
    {
        settingsTempLimit,
        onUpdate,
        tempSensors,
        error
    }
) => {
    const sensorIdRef = useRef<any>(null)
    const tempLimitRef = useRef<any>(null)
    const tempDeltaRef = useRef<any>(null)
    const sendNotificationRef = useRef<any>(null)

    const handleUpdate = () => {
        onUpdate({
            sensorId: sensorIdRef.current.value ? String(sensorIdRef.current.value) : null,
            sendNotification: sendNotificationRef.current.checked,
            tempLimit: Number(tempLimitRef.current.value),
            tempDelta: Number(tempDeltaRef.current.value)
        })
    }
    return <div className={styles.TempLimitTable}>
        {error && <div className={styles.tempLimitErrorFrame}>
            <p>{error}</p>
        </div>}
        <div className={styles.tempLimitTableFrame}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faThermometer}/>
                    </td>
                    <td>
                        <label>Sonde</label>
                    </td>
                    <td>
                        <select ref={sensorIdRef} defaultValue={tempSensors.find(tempSensor => tempSensor.id === settingsTempLimit?.sensorId)?.id}>
                            {
                                !tempSensors.find(tempSensor => tempSensor.id === settingsTempLimit?.sensorId)
                                && <option selected={true} disabled={true} hidden={true}>Sonde...</option>
                            }
                            {tempSensors.map(tempSensor => {
                                return <option
                                    key={tempSensor.id}
                                    value={tempSensor.id}>
                                    {tempSensor.name}
                                </option>
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faTemperatureHigh}/>
                    </td>
                    <td>
                        <label>Température limite</label>
                    </td>
                    <td>
                        <input type='number' ref={tempLimitRef} defaultValue={settingsTempLimit?.tempLimit}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faArrowsAltV}/>
                    </td>
                    <td>
                        <label>Température delta</label>
                    </td>
                    <td>
                        <input type='number' ref={tempDeltaRef} defaultValue={settingsTempLimit?.tempDelta}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faBell}/>
                    </td>
                    <td>
                        <label>Envoyer les notifications</label>
                    </td>
                    <td>
                        <input type='checkbox' ref={sendNotificationRef} defaultChecked={settingsTempLimit?.sendNotification}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className={styles.tempLimitFooterFrame}>
            <Button onClick={handleUpdate}>
                Modifier
            </Button>
        </div>
    </div>
}