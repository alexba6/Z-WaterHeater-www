import { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalTemplate } from '../template/global-template'
import { Box, Title } from '../components/box/box-structure'
import { loadTempSensors, updateTempSensors } from '../store/temp-sensors/tempSensorActions'
import { tempSensorSelector } from '../store/temp-sensors/tempSensorsSelector'
import { TempSensorTable } from '../components/temp-sensor/temp-sensor-table'
import { TempSensorSU } from '../type/tempSensor'

export const TempSensorPage: FunctionComponent = () => {
    const tempSensorsStore = useSelector(tempSensorSelector)
    const dispatch = useDispatch()
    const [tempSensorsSU, setTempSensorsSU] = useState<Array<TempSensorSU>>([])

    useEffect(() => {
        dispatch(loadTempSensors())
    }, [dispatch])

    useEffect(() => {
        setTempSensorsSU(tempSensorsStore.tempSensors.map(tempSensors => {
            return {
                store: JSON.parse(JSON.stringify(tempSensors)),
                updated: JSON.parse(JSON.stringify(tempSensors))
            }
        }))
    }, [tempSensorsStore])

    const onChangeTempSensorItem = <K extends keyof TempSensorSU['updated']>(
            value: TempSensorSU['updated'][K],
            tempSensorSUContext: TempSensorSU,
            key: K
        ) => {
        setTempSensorsSU(tempSensorsSU.map(tempSensorSU => {
            if (tempSensorSU.store.id === tempSensorSUContext.store.id) {
                tempSensorSU.updated[key] = value
            }
            return tempSensorSU
        }))
    }

    const onUpdateTempSensors = () => {

        const tempSensorsToUpdate = tempSensorsSU.filter(tempSensorSU => (
            tempSensorSU.store.name !== tempSensorSU.updated.name
            || tempSensorSU.store.color !== tempSensorSU.updated.color
            || tempSensorSU.store.displayOnScreen !== tempSensorSU.updated.displayOnScreen
        )).map(tempSensorsSU => tempSensorsSU.updated)
        if (tempSensorsToUpdate.length > 0) {
            dispatch(updateTempSensors(tempSensorsToUpdate))
        }
    }

    return <GlobalTemplate>
        <Title title='Sondes température'/>
        <Box>
            <TempSensorTable
                tempSensorsSU={tempSensorsSU}
                onChangeName={(name, tempSensorContext) => onChangeTempSensorItem(name, tempSensorContext, 'name')}
                onChangeColor={(color, tempSensorContext) => onChangeTempSensorItem(color, tempSensorContext, 'color')}
                onToggleDisplayOnScreen={tempSensorContext => onChangeTempSensorItem(!tempSensorContext.updated.displayOnScreen, tempSensorContext, 'displayOnScreen')}
                onUpdate={onUpdateTempSensors}
            />
        </Box>
    </GlobalTemplate>
}
