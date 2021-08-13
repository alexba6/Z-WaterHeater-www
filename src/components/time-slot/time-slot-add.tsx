import {FunctionComponent} from "react";
import {TimeSlotWithoutId} from "../../type/timeSlot";
import {Button} from "../button/button";
import {TimeSlotEdit} from "./time-slot-row";
import {OutputGroup} from "../../type/outputGroup";

import styles from './time-slot-add.module.sass'

type TimeSlotAddProps = {
    timeSlotAdd: TimeSlotWithoutId,
    outputGroups: Array<OutputGroup>,
    onChangeStart: (start: string) => void,
    onChangeEnd: (end: string) => void,
    onChangeGroupId: (groupId: string) => void,
    viewTimeLine: boolean,
    toggleViewTimeLine: () => void,
    onAdd: () => void,
}

export const TimeSlotAdd: FunctionComponent<TimeSlotAddProps> = (
    {
        timeSlotAdd,
        outputGroups,
        onChangeStart,
        onChangeEnd,
        onChangeGroupId,
        viewTimeLine,
        toggleViewTimeLine,
        onAdd
    }) => {
    return <div className={styles.timeSlotAddContainer}>
        <div className={styles.timeSlotAddEditFrame}>
            <TimeSlotEdit
                groups={outputGroups}
                onChangeGroupId={onChangeGroupId}
                onChangeStart={onChangeStart}
                onChangeEnd={onChangeEnd}
                timeSlot={timeSlotAdd}/>
            <div className={styles.timeSlotAddViewTimeLineFrame}>
                <div className={styles.timeSlotAddViewTimeLineLabelFrame}>
                    <label>Voir le rendu en temps réel</label>
                </div>
                <div>
                    <input type='checkbox' onChange={toggleViewTimeLine} checked={viewTimeLine}/>
                </div>
            </div>
        </div>
        <div className={styles.timeSlotAddButtonAddFrame}>
            <Button onClick={onAdd}>Ajouter</Button>
        </div>
    </div>
}
