import { FunctionComponent, useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalTemplate } from '../template/global-template'
import { Box, Title } from '../components/box/box-structure'
import { timeSlotsFilterByStart } from '../store/time-slots/timeSlotsSelector'
import {
    addTimeSlot,
    deleteTimeSlot,
    loadTimeSlots,
    updateTimeSlots
} from '../store/time-slots/timeSlotsActions'
import { TimeSlotTimeLine } from '../components/time-slot/time-slot-time-line'
import { outputGroupsSelector} from '../store/output-groups/outputGroupsSelector'
import { loadOutputGroup } from '../store/output-groups/outputGroupsActions'
import { TimeSlotWithoutId, TimeSlotWithUpdate } from '../type/timeSlot'
import { TimeSlotTable } from '../components/time-slot/time-slot-table'
import { TimeSlotAdd } from '../components/time-slot/time-slot-add'


export const TimeSlotPage: FunctionComponent = () => {
    const [timeSlotsWithUpdate, setTimeSlotWithUpdate] = useState<Array<TimeSlotWithUpdate>>([])
    const [timeSlotAdd, setTimeSlotAdd] = useState<TimeSlotWithoutId>({
        start: '00:00:00',
        end: '00:01:00',
        groupId: ''
    })
    const [viewTimeSlotAddOnTimeLine, setViewTimeSlotAddOnTimeLine] = useState(false)

    const dispatch = useDispatch()
    const timeSlotsStore = useSelector(timeSlotsFilterByStart)
    const outputGroupsStore = useSelector(outputGroupsSelector)

    /**
     * Split the time slots from store in updated and store
     */
    const loadTimeSlotWithUpdate = useCallback(() => {
        setTimeSlotWithUpdate(timeSlotsStore.timeSlots.map(timeSlotStore => {
            return {
                store: {...timeSlotStore},
                updated: {...timeSlotStore}
            }
        }))
    }, [timeSlotsStore])

    /**
     * Change the update time slot buffer
     * @param value
     * @param timeSlot
     * @param type
     */
    const onChangeTimeSlotParams = (value: string, timeSlot: TimeSlotWithUpdate, type: keyof TimeSlotWithUpdate['updated']) => {
        setTimeSlotWithUpdate(timeSlotsWithUpdate.map(timeSlotWithUpdate => {
            if (timeSlotWithUpdate.store.id === timeSlot.store.id) {
                timeSlotWithUpdate.updated[type] = value
            }
            return timeSlotWithUpdate
        }))
    }

    /**
     * Update the time slot
     */
    const onUpdateTimeSlots = () => {
        const timeSlotToUpdate = timeSlotsWithUpdate.filter(timeSlotWithUpdate => {
            const {store, updated} = timeSlotWithUpdate
            return store.start !== updated.start || store.end !== updated.end || store.groupId !== updated.groupId
        }).map(timeSlotToUpdate => {
            return {
                id: timeSlotToUpdate.store.id,
                ...timeSlotToUpdate.updated
            }
        })
        if (timeSlotToUpdate.length > 0) {
            dispatch(updateTimeSlots(timeSlotToUpdate))
        }
    }

    const onDeleteTimeSlot = (timeSlotWithUpdate: TimeSlotWithUpdate) => {
        dispatch(deleteTimeSlot(timeSlotWithUpdate.store))
    }

    const onAddTimeSlot = () => {
        dispatch(addTimeSlot(timeSlotAdd))
    }


    useEffect(() => {
        loadTimeSlotWithUpdate()
    }, [loadTimeSlotWithUpdate])

    useEffect(() => {
        dispatch(loadTimeSlots())
        dispatch(loadOutputGroup())
    }, [dispatch])

    let loading = timeSlotsStore.status !== 'READY' || outputGroupsStore.status !== 'READY'

    return <GlobalTemplate>
        <Title title='Plages'/>
        <Box title='Time line' loading={loading}>
            <TimeSlotTimeLine
                currentTimeSlots={timeSlotsWithUpdate.map(timeSlotWithUpdate => timeSlotWithUpdate.store)}
                updatedTimeSlots={timeSlotsWithUpdate.map(timeSlotWithUpdate => timeSlotWithUpdate.updated)}
                addTimeSlot={viewTimeSlotAddOnTimeLine ? timeSlotAdd : undefined}
                outputGroups={outputGroupsStore.outputGroups}/>
        </Box>
        <Box title='Modification' loading={loading}>
            <TimeSlotTable
                timeSlotsWithUpdate={timeSlotsWithUpdate}
                onChangeStart={(start, timeSlotWithUpdate) => onChangeTimeSlotParams(start, timeSlotWithUpdate, 'start')}
                onChangeEnd={(end, timeSlotWithUpdate) => onChangeTimeSlotParams(end, timeSlotWithUpdate, 'end')}
                onChangeGroupId={(groupId, timeSlotWithUpdate) => onChangeTimeSlotParams(groupId, timeSlotWithUpdate, 'groupId')}
                onUpdate={onUpdateTimeSlots}
                onDelete={timeSlotWithUpdate => onDeleteTimeSlot(timeSlotWithUpdate)}
                groups={outputGroupsStore.outputGroups}
            />
        </Box>
        <Box title='Ajouter' loading={loading}>
            <TimeSlotAdd
                timeSlotAdd={timeSlotAdd}
                outputGroups={outputGroupsStore.outputGroups}
                onChangeStart={start => setTimeSlotAdd({...timeSlotAdd, start})}
                onChangeEnd={end => setTimeSlotAdd({...timeSlotAdd, end})}
                onChangeGroupId={groupId => setTimeSlotAdd({...timeSlotAdd, groupId})}
                viewTimeLine={viewTimeSlotAddOnTimeLine}
                toggleViewTimeLine={() => setViewTimeSlotAddOnTimeLine(!viewTimeSlotAddOnTimeLine)}
                onAdd={onAddTimeSlot}
            />
        </Box>
    </GlobalTemplate>
}
