import React, {
    FunctionComponent,
    useState
} from "react"
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

import { OutGroup } from "../../api/type"

import styles from "./time-slot-row.module.sass"
import { Button } from "../button/button";
import {BoxCardWrapper} from "../box/box-card-wrapper";
import {TimeSlotWithUpdate} from "../../type/timeSlot";

type TimeSlotEditInputFrameProps = {
    name: string
}

type TimeSlotEditProps = {
    groups: Array<OutGroup>,
    onChangeGroupId: (groupId: string) => void,
    onChangeStart: (start: string) => void,
    onChangeEnd: (end: string) => void,
    timeSlot: {
        start: string | undefined,
        end: string | undefined,
        groupId: string | undefined
    }
}

type TimeSlotViewProps = {
    groupName : string,
    start: string,
    end: string,
    onDelete: () => void
}

type TimeSlotRowProps = {
    timeSlot: TimeSlotWithUpdate,
    groups: Array<OutGroup>,
    onChangeStart: (start: string) => void,
    onChangeEnd: (end: string) => void,
    onChangeGroupId: (groupId: string) => void,
    onDelete: () => void
}

/**
 * TimeSlotEditInputFrame
 * @param name
 * @param children
 * @constructor
 */
const TimeSlotEditInputFrame: FunctionComponent<TimeSlotEditInputFrameProps> = (
    {
        name,
        children
    }) => {
    return <div className={styles.rowEditFrame}>
        <div className={styles.rowEditLabelFrame}>
            <label>{name}</label>
        </div>
        <div className={styles.rowEditInputFrame}>
            {children}
        </div>
    </div>
}


/**
 * TimeSlotEdit
 * @param groups
 * @param onChangeGroupId
 * @param onChangeStart
 * @param onChangeEnd
 * @param timeSlot
 * @param buttonConfig
 * @constructor
 */
export const TimeSlotEdit: FunctionComponent<TimeSlotEditProps> = (
    {
        groups,
        onChangeGroupId,
        onChangeStart,
        onChangeEnd,
        timeSlot
    }
) => {
    const errorGroupId = !groups.find(group => group.id === timeSlot.groupId)
    return <div className={styles.rowEditContainer}>
        <TimeSlotEditInputFrame name='Groupe'>
            <select
                className={styles.rowEditGroupSelect}
                onChange={e => onChangeGroupId(e.target.value)}
            >
                {errorGroupId && <option selected={true} disabled={true} hidden={true}>Groupe...</option>}
                {groups.map(group => {
                    return <option
                        key={group.id}
                        value={group.id}
                        selected={group.id === timeSlot.groupId}>
                        {group.name}
                    </option>
                })}
            </select>
        </TimeSlotEditInputFrame>
        <TimeSlotEditInputFrame name='Début'>
            <input
                className={styles.rowEditTimeButton}
                type='time'
                value={timeSlot.start}
                onChange={e => onChangeStart(e.target.value)}/>
        </TimeSlotEditInputFrame>
        <TimeSlotEditInputFrame name='Fin'>
            <input
                className={styles.rowEditTimeButton}
                type='time'
                value={timeSlot.end}
                onChange={e => onChangeEnd(e.target.value)}/>
        </TimeSlotEditInputFrame>
    </div>
}

/**
 * TimeSlotView
 * @param groupName
 * @param start
 * @param end
 * @param buttonConfig
 * @param onDelete
 * @constructor
 */
const TimeSlotView: FunctionComponent<TimeSlotViewProps> = (
    {
        groupName,
        start,
        end,
        onDelete
    }
) => {
    return <div className={styles.rowViewContainer}>
        <div className={styles.rowViewGroupNameFrame}>
            <label>{groupName}</label>
        </div>
        <div className={styles.rowViewStartEndFrame}>
            <label>De {start} à {end}</label>
        </div>
        <div className={styles.rowEditDeleteButtonFrame}>
            <Button onClick={onDelete}>
                Supprimer
            </Button>
        </div>
    </div>
}

/**
 * TimeSlotRow
 * @param timeSlot
 * @param groups
 * @param onChangeStart
 * @param onChangeEnd
 * @param onChangeGroupId
 * @param onDelete
 * @constructor
 */
export const TimeSlotRow: FunctionComponent<TimeSlotRowProps> = (
    {
        timeSlot,
        groups,
        onChangeStart,
        onChangeEnd,
        onChangeGroupId,
        onDelete
    }
) => {
    const [readOnly, setReadOnly] = useState(true)

    const focus = timeSlot.store.start !== timeSlot.updated.start ||
        timeSlot.store.end !== timeSlot.updated.end ||
        timeSlot.store.groupId !== timeSlot.updated.groupId

    const getGroupName = () => {
        const groupName = groups.find(group => group.id === timeSlot.store.groupId)?.name
        return groupName ? groupName : 'Erreur'
    }

    const groupName = getGroupName()

    if (readOnly) {
        return <BoxCardWrapper
            buttons={[{
                name: 'Modifier',
                onClick: () => setReadOnly(false)
            }]}
            icon={faHourglassHalf}
            focus={focus}
        >
            <TimeSlotView
                groupName={groupName}
                start={timeSlot.store.start}
                end={timeSlot.store.end}
                onDelete={onDelete}/>
        </BoxCardWrapper>
    }
    return <BoxCardWrapper
        buttons={[{
            name: 'Retour',
            onClick: () => setReadOnly(true)
        }]}
        icon={faHourglassHalf}
        focus={focus}
    >
        <TimeSlotEdit
            groups={groups}
            onChangeGroupId={onChangeGroupId}
            onChangeStart={onChangeStart}
            onChangeEnd={onChangeEnd}
            timeSlot={timeSlot.updated}/>
    </BoxCardWrapper>
}