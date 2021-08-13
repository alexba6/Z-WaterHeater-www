import {FunctionComponent} from "react";
import {Control} from "../../type/control";
import {OutGroup} from "../../api/type";
import {MultipleButton} from "../button/multiple-button";


type ControlButtonsProps = {
    control: Control | null,
    outputGroups: Array<OutGroup>
    onOff: () => void,
    onAuto: () => void,
    onOn: (group: OutGroup) => void
}


export const ControlButtons: FunctionComponent<ControlButtonsProps> = (
    {
        control,
        outputGroups,
        onOff,
        onAuto,
        onOn
    }
) => {
    return <div>
        <MultipleButton config={[
            {
                name: 'OFF',
                onClick: onOff,
                disable: control?.mode === 'OFF'
            },
            {
                name: 'AUTO',
                onClick: onAuto,
                disable: control?.mode === 'AUTO'
            },
            ...outputGroups.map(group => {
                return {
                    name: group.name,
                    onClick: () => onOn(group),
                    disable: control?.mode === 'ON' && control?.enableGroupId === group.id
                }
            })
        ]}/>
    </div>
}