import {FunctionComponent, useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalTemplate } from '../template/global-template'
import { Box, Title } from '../components/box/box-structure'
import { loadTemperatureDay } from '../store/temperature/temperatureActions'
import { TemperatureChart } from '../components/temperature/temperature-chart'
import { temperatureSelector} from '../store/temperature/temperatureSelector'
import { loadTempSensors } from '../store/temp-sensors/tempSensorActions'
import { tempSensorSelector } from '../store/temp-sensors/tempSensorsSelector'
import {getAllSensorId, getFormatTemperatureDataChart, getTemperatureChartColor} from "../tools/temperatureFormat";
import {TemperatureDatePicker} from "../components/temperature/temperature-date-picker";
import {isSameDay} from "../tools/date";
import {TemperatureSortSensor} from "../components/temperature/temperature-sort-sensor";
import {TemperatureData} from "../type/temperature";
import {TemperatureOverview} from "../components/temperature/temperature-overview";


export const TemperaturePage: FunctionComponent = () => {
    const dispatch = useDispatch()
    const temperaturesStore = useSelector(temperatureSelector)
    const temperatureSensorsStore = useSelector(tempSensorSelector)

    const [date, setDate] = useState<Date>(new Date())
    const [temperatureDataChart, setTemperatureDataChart] = useState<Array<Array<string | number | null>>>([])
    const [temperatureColorsChart, setTemperatureColorsChart] = useState<Array<string>>([])
    const [availableSensorsId, setAvailableSensorsId] = useState<Array<string>>([])
    const [sortedSensorsId, setSortedSensorId] = useState<Array<string>>([])
    const [average, setAverage] = useState(false)


    useEffect(() => {
        dispatch(loadTempSensors())
    }, [dispatch])

    useEffect(() => {
        dispatch(loadTemperatureDay(date))
    }, [dispatch, date])


    const loadTempData = useCallback((temperature: Array<TemperatureData>) => {
        setTemperatureDataChart(getFormatTemperatureDataChart(
            sortedSensorsId,
            temperatureSensorsStore.tempSensors,
            temperature,
            average
        ))
        setTemperatureColorsChart(getTemperatureChartColor(sortedSensorsId, temperatureSensorsStore.tempSensors, average))
    }, [sortedSensorsId, temperatureSensorsStore.tempSensors, average])


    useEffect(() => {
        const tempFind = temperaturesStore.temperatures.find(temperatureStore => isSameDay(temperatureStore.date, date))
        if (tempFind) {
            const sensorsId = getAllSensorId(tempFind.temperature)
            setAvailableSensorsId(sensorsId)
            setSortedSensorId(sensorsId)
        }
    }, [temperaturesStore, date])

    useEffect(() => {
        const tempFind = temperaturesStore.temperatures.find(temperatureStore => isSameDay(temperatureStore.date, date))
        if (tempFind) {
            loadTempData(tempFind.temperature)
        }
    }, [loadTempData, temperaturesStore, date])

    const onToggleSortedSensorsId = (toggleSensorId: string) => {
        if (sortedSensorsId.find(sortedTempSensorId => sortedTempSensorId === toggleSensorId)) {
            if (sortedSensorsId.length <= 1) return
            setSortedSensorId(sortedSensorsId.filter(sortedTempSensorId => sortedTempSensorId !== toggleSensorId))
        }
        else {
            setSortedSensorId([...sortedSensorsId, toggleSensorId])
        }
    }



    const loading = temperaturesStore.status !== 'READY' || temperatureSensorsStore.status !== 'READY'

    return <GlobalTemplate>
        <Title title='Température'/>
        <Box title='Température' loading={loading}>
            <TemperatureOverview
                temperatures={temperaturesStore.temperatures.find(temperatureStore => isSameDay(temperatureStore.date, date))}
                tempSensors={temperatureSensorsStore.tempSensors}/>
        </Box>
        <Box title='Chart' loading={loading}>
            <TemperatureChart data={temperatureDataChart} colors={temperatureColorsChart} date={date.toDateString()}/>
        </Box>
        <Box title='Filter' loading={loading}>
            <TemperatureDatePicker
                onChangeDate={date => setDate(date)}
            />
            <TemperatureSortSensor
                availableSensorsId={availableSensorsId}
                sortedSensorsId={sortedSensorsId}
                tempSensors={temperatureSensorsStore.tempSensors}
                onToggle={onToggleSortedSensorsId}
                average={average}
                onToggleAverage={() => setAverage(!average)}
            />
        </Box>
    </GlobalTemplate>
}
