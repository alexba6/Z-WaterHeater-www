import {FunctionComponent} from "react";
import {TempSensorSU} from "../../type/tempSensor";
import {TempSensorRow} from "./temp-sensor-row";
import {Button} from "../button/button";

import styles from './temp-sensor-table.module.sass'

type TempSensorTableProps = {
    tempSensorsSU: Array<TempSensorSU>,
    onChangeName: (name: string, tempSensorSU: TempSensorSU) => void,
    onChangeColor: (color: string, tempSensorSU: TempSensorSU) => void,
    onToggleDisplayOnScreen: (tempSensorSU: TempSensorSU) => void,
    onUpdate: () => void
}

export const TempSensorTable: FunctionComponent<TempSensorTableProps> = (
    {
        tempSensorsSU,
        onChangeName,
        onChangeColor,
        onToggleDisplayOnScreen,
        onUpdate
    }
) => {
    return <div>
        <div className={styles.tempSensorTableFrame}>
            {tempSensorsSU.map(tempSensorSU => <TempSensorRow
                    key={tempSensorSU.store.id}
                    tempSensorSU={tempSensorSU}
                    onChangeName={name => onChangeName(name, tempSensorSU)}
                    onChangeColor={color => onChangeColor(color, tempSensorSU)}
                    onToggleDisplayOnScreen={() => onToggleDisplayOnScreen(tempSensorSU)}
                />
            )}
        </div>
        <div className={styles.tempSensorSaveButtonFrame}>
            <Button onClick={onUpdate}>
                Modifier
            </Button>
        </div>
    </div>
}