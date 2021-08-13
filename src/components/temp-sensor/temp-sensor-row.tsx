import {FunctionComponent, useState} from "react";
import {TempSensor, TempSensorSU} from "../../type/tempSensor";
import {faQuestionCircle, faTemperatureHigh, faThermometer, faTint} from "@fortawesome/free-solid-svg-icons";

import styles from './temp-sensor-row.module.sass'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Input} from "../input/input";

type TempSensorRowProps = {
    tempSensorSU: TempSensorSU,
    onChangeName: (name: string) => void,
    onChangeColor: (color: string) => void,
    onToggleDisplayOnScreen: () => void
}

type TempSensorViewProps = {
    tempSensor: TempSensor,
}

type TempSensorEditProps = {
    tempSensor: TempSensor,
    onChangeName: (name: string) => void,
    onChangeColor: (color: string) => void,
    onToggleDisplayOnScreen: () => void
}

type TempSensorWrapperProps = {
    btnName: string,
    onClick: () => void,
    name: string,
    focus: boolean
}

const TempSensorWrapper: FunctionComponent<TempSensorWrapperProps> = (
    {
        children,
        name,
        btnName,
        onClick,
        focus
    }
) => {
    return <div className={styles.tempSensorWrapperContainer} focus={focus ? 'focus' : undefined}>
        <div className={styles.tempSensorWrapperHeaderFrame}>
            <h2><FontAwesomeIcon icon={faTemperatureHigh}/> Temp {name}</h2>
        </div>
        {children}
        <div className={styles.tempSensorWrapperButtonFrame}>
            <button onClick={onClick}>{btnName}</button>
        </div>
    </div>
}

const TempSensorView: FunctionComponent<TempSensorViewProps> = ({tempSensor}) => {
    return <div className={styles.tempSensorViewContainer}>
        <div activity={tempSensor.alive ? 'able' : 'disable'}/>
        <div className={styles.tempSensorViewContentFrame}>
            <div className={styles.tempSensorViewItemFrame}>
                <label><strong>Id:</strong> {tempSensor.id}</label>
            </div>
            <div className={styles.tempSensorViewItemFrame}>
                <label>
                    <div className={styles.tempSensorViewColorCircleCenterLayout}>
                        <div>
                            <strong>Couleur: </strong>
                        </div>
                        <div
                            className={styles.tempSensorViewColorCircleMaskFrame}
                            style={{
                                borderColor: tempSensor.color ? tempSensor.color : "transparent",
                            }}
                        >
                            <div
                                className={styles.tempSensorViewColorCircleFrame}
                                style={{
                                    background: tempSensor.color ? tempSensor.color : "transparent",
                                }}
                            />
                        </div>
                    </div>
                </label>
            </div>
            <div className={styles.tempSensorViewItemFrame}>
                <label><strong>Affichée sur écran:</strong> {tempSensor.displayOnScreen ? 'oui' : 'non'}</label>
            </div>
        </div>
    </div>
}

const TempSensorEdit: FunctionComponent<TempSensorEditProps> = (
    {
        tempSensor,
        onChangeName,
        onChangeColor,
        onToggleDisplayOnScreen
    }
) => {
    const [name, setName] = useState(tempSensor.name)
    const [nameError, setNameError] = useState<string | null>(null)
    const handleChangeName = (name: string) => {
        setNameError(null)
        if (name.length > 5) {
            setNameError('4 caractères maximum')
            return
        }
        setName(name)
        onChangeName(name)
    }
    return <div className={styles.tempSensorEditContainer}>
        <div className={styles.tempSensorEditItemsFrame}>
            <Input
                icon={faThermometer}
                placeholder='Nom...'
                type='text'
                value={name}
                onChange={e => handleChangeName(e.target.value)}
            />
            <label>{nameError}</label>
        </div>
        <div className={styles.tempSensorEditItemsFrame}>
            <Input
                icon={faTint}
                type='color'
                value={tempSensor.color ?? ''}
                onChange={e => onChangeColor(e.target.value)}/>
        </div>
        <div className={styles.tempSensorEditCheckboxLayout}>
            <div className={styles.tempSensorEditCheckboxIconFrame}>
                <FontAwesomeIcon icon={faQuestionCircle}/>
            </div>
            <div>
                <label>Afficher sur l'écran</label>
            </div>
            <div className={styles.tempSensorEditCheckboxInputFrame}>
                <input
                    type='checkbox'
                    onChange={onToggleDisplayOnScreen}
                    checked={tempSensor.displayOnScreen}
                />
            </div>
        </div>
    </div>
}


export const TempSensorRow: FunctionComponent<TempSensorRowProps> = (
    {
        tempSensorSU,
        onChangeName,
        onChangeColor,
        onToggleDisplayOnScreen
    }
) => {
    const [readOnly, setReadOnly] = useState(true)

    const {store, updated} = tempSensorSU
    const focus = store.name !== updated.name
        || store.color !== updated.color
        || store.displayOnScreen !== updated.displayOnScreen

    if (readOnly) {
        return <TempSensorWrapper
            focus={focus}
            name={tempSensorSU.store.name}
            btnName='Editer'
            onClick={() => setReadOnly(false)}
        >
            <TempSensorView
                tempSensor={tempSensorSU.store}
            />
        </TempSensorWrapper>
    }
    return <TempSensorWrapper
        focus={focus}
        name={tempSensorSU.store.name}
        btnName='Retour'
        onClick={() => setReadOnly(true)}
    >
        <TempSensorEdit
            tempSensor={tempSensorSU.updated}
            onChangeName={onChangeName}
            onChangeColor={onChangeColor}
            onToggleDisplayOnScreen={onToggleDisplayOnScreen}
        />
    </TempSensorWrapper>
}
