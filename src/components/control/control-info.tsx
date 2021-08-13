import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FunctionComponent} from "react";
import {Control } from "../../type/control";
import {OutGroup} from "../../api/type";
import {faBolt, faStopwatch, faToggleOn} from "@fortawesome/free-solid-svg-icons";

import styles from './control-info.module.sass'

type ControlInfoProps = {
    control: Control | null
    outputGroups: Array<OutGroup>
}

export const ControlInfo: FunctionComponent<ControlInfoProps> = (
    {
        control,
        outputGroups
    }
) => {
    return <div className={styles.controlInfoContainer}>
        <table>
            <tbody>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faBolt}/>
                    </td>
                    <td>
                        <label>Mode</label>
                    </td>
                    <td>
                        <label>{control?.mode.toUpperCase()}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faToggleOn}/>
                    </td>
                    <td>
                        <label>Groupe activé</label>
                    </td>
                    <td>
                        {outputGroups.find(group => group.id === control?.enableGroupId)?.name ?? 'Aucun'}
                    </td>
                </tr>
                {control?.mode !== 'AUTO' &&
                <tr>
                    <td>
                        <FontAwesomeIcon icon={faStopwatch}/>
                    </td>
                    <td>
                        <label>Retour auto dans</label>
                    </td>
                    <td>
                        <label>{control?.returnAutoIn}</label>
                    </td>
                </tr>}
            </tbody>
        </table>
    </div>
}
