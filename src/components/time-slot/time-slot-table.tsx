import { FunctionComponent } from "react";
import { TimeSlotWithUpdate } from "../../type/timeSlot";

import { TimeSlotRow } from "./time-slot-row";
import {OutputGroup} from "../../type/outputGroup";
import {Button} from "../button/button";

import styles from './time-slot-table.module.sass'

type TimeSlotTableProps = {
    timeSlotsWithUpdate: Array<TimeSlotWithUpdate>,
    onChangeStart: (start: string, timeSlot: TimeSlotWithUpdate) => void,
    onChangeEnd: (end: string, timeSlot: TimeSlotWithUpdate) => void,
    onChangeGroupId: (groupId: string, timeSlot: TimeSlotWithUpdate) => void,
    onUpdate: () => void,
    onDelete: (timeSlot: TimeSlotWithUpdate) => void,
    groups: Array<OutputGroup>
}

export const TimeSlotTable: FunctionComponent<TimeSlotTableProps> = (
    {
        timeSlotsWithUpdate,
        onChangeStart,
        onChangeEnd,
        onChangeGroupId,
        onUpdate,
        onDelete,
        groups
    }
) => {
    const onDeleteWithConfirm = (timeSlotWithUpdate: TimeSlotWithUpdate) => {
        if (window.confirm('Voulez-vous vraiment supprimer cette plage ?')) {
            onDelete(timeSlotWithUpdate)
        }
    }
    return <div className={styles.timeSlotTableContainer}>
        <div>
            {timeSlotsWithUpdate.map(timeSlotWithUpdate => <TimeSlotRow
                timeSlot={timeSlotWithUpdate}
                groups={groups}
                onChangeStart={start => onChangeStart(start, timeSlotWithUpdate)}
                onChangeEnd={end => onChangeEnd(end, timeSlotWithUpdate)}
                onChangeGroupId={groupId => onChangeGroupId(groupId, timeSlotWithUpdate)}
                onDelete={() => onDeleteWithConfirm(timeSlotWithUpdate)}/>
            )}
        </div>
        <div className={styles.timeSlotTableSaveButtonFrame}>
            <Button onClick={onUpdate}>
                Enregistrer
            </Button>
        </div>
    </div>
}
