import React, {FunctionComponent, useContext} from "react";
import Chart from "react-google-charts";
import {TimeSlot, TimeSlotWithoutId} from "../../type/timeSlot";
import {OutGroup} from "../../api/type";
import {ThemeContext} from "../../context/theme-context";

type TimeSlotTimeLineProps = {
    currentTimeSlots: Array<TimeSlot>,
    updatedTimeSlots: Array<TimeSlotWithoutId>,
    addTimeSlot: TimeSlotWithoutId | undefined,
    outputGroups: Array<OutGroup>
}

export const TimeSlotTimeLine: FunctionComponent<TimeSlotTimeLineProps> = ({currentTimeSlots, updatedTimeSlots, outputGroups, addTimeSlot}) => {
    const theme = useContext(ThemeContext)
    const findOutputGroupName = (timeSlot: TimeSlot | TimeSlotWithoutId): string => {
        const name = outputGroups.find(outputGroup => outputGroup.id === timeSlot.groupId)?.name
        return name ? name : 'Erreur'
    }
    const formatDate = (stringDate: string): Date => {
        const [hours, minutes] = stringDate.split(':')
        const date = new Date()
        date.setHours(Number(hours))
        date.setMinutes(Number(minutes))
        return date
    }

    const formatChartData = (timeSlot: TimeSlot | TimeSlotWithoutId, type: 'Current' | 'Updated' | 'Add') => {
        return [
            type,
            findOutputGroupName(timeSlot),
            formatDate(timeSlot.start),
            formatDate(timeSlot.end)
        ]
    }

    let dataChart = [
        [
            { type: 'string', id: 'Position' },
            { type: 'string', id: 'Name' },
            { type: 'date', id: 'Start' },
            { type: 'date', id: 'End' },
        ],
        ...currentTimeSlots.map(currentTimeSlot => formatChartData(currentTimeSlot, 'Current')),
        ...updatedTimeSlots.map(updatedTimeSlot => formatChartData(updatedTimeSlot, 'Updated'))
    ]

    if (addTimeSlot) {
        dataChart.push(formatChartData(addTimeSlot, 'Add'))
    }

    return <div>
        <Chart
            width={'100%'}
            height={'275px'}
            chartType="Timeline"
            loader={<div>Loading Chart</div>}
            data={dataChart}
            options={{
                backgroundColor: theme.colors.secondBoxColor,
                hAxis: {
                    textStyle: {
                        color: theme.colors.textColor
                    }
                },
                vAxis: {
                    textStyle:{
                        color: theme.colors.textColor
                    }
                },
                timeline: {
                    rowLabelStyle: {
                        fontName: 'Roboto',
                        fontSize: 18,
                        color: theme.colors.textColor
                    },
                    barLabelStyle: {
                        fontName: 'Roboto',
                        fontSize: 18
                    }
                }
            }}
            rootProps={{ 'data-testid': '3' }}
        />
    </div>
}