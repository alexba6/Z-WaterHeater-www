import {FunctionComponent, useContext} from "react";
import {ThemeContext} from "../../context/theme-context";
import Chart from "react-google-charts";

import styles from './temperature-chart.module.sass'

type TemperatureChartProps = {
    data: Array<Array<number | string | null>>,
    colors: Array<string>,
    date: string
}

export const TemperatureChart: FunctionComponent<TemperatureChartProps> = ({data, date, colors}) => {
    const theme = useContext(ThemeContext)

    return <div className={styles.tempChartContainer}>
        <h2>
            Le {date}
        </h2>
        <Chart
            width={'100%'}
            height={'500px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                chart: {
                    title: 'Température',
                },
                colors: colors,
                backgroundColor: theme.colors.secondBoxColor,
                chartArea: {
                    backgroundColor: theme.colors.secondBoxColor
                },
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
                legend: {
                    textStyle:{
                        color: theme.colors.textColor
                    },
                    position: 'bottom',
                    alignment: 'center',
                    width: 520,
                    height: 350
                }
            }}
            rootProps={{ 'data-testid': '3' }}
        />
    </div>
}
