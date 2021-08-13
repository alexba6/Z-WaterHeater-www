import {FunctionComponent, useRef} from "react";

import styles from './temperature-date-picker.module.sass'
import {Button} from "../button/button";
import { InputRef} from "../input/input";

type TemperatureDatePickerProps = {
    onChangeDate: (date: Date) => void
}

export const TemperatureDatePicker: FunctionComponent<TemperatureDatePickerProps> = ({onChangeDate}) => {
    const dateRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if (dateRef.current) {
            const [year, month, day] = dateRef.current.value.split('-').map(v => Number(v))
            const date = new Date()
            date.setFullYear(year, month - 1, day)
            onChangeDate(date)
        }
    }

    return <div className={styles.tempDatePickerContainer}>
        <div>
            <InputRef type='date' ref={dateRef}/>
        </div>
        <div>
            <Button onClick={handleClick}>
                Valider
            </Button>
        </div>
    </div>
}


