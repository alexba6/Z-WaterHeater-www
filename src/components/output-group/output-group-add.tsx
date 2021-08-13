import {FunctionComponent } from "react";
import { OutputGroupRowEdit } from './output-group-row'
import {Button} from "../button/button";

import styles from './output-group-add.module.sass'
import {OutputGroupWithoutId} from "../../type/outputGroup";

type OutputGroupAddProps = {
    outputGroup: OutputGroupWithoutId,
    onChangeName: (name: string) => void,
    onChangeOutId: (outId: string) => void,
    onAdd: () => void,
    availableOutId: Array<string>
}

export const OutputGroupAdd: FunctionComponent<OutputGroupAddProps> = (
    {
        outputGroup,
        onChangeName,
        onChangeOutId,
        onAdd,
        availableOutId
    }
) => {

    return <div className={styles.outputGroupAddContainer}>
        <div>
            <OutputGroupRowEdit
                outputGroup={outputGroup}
                onChangeName={onChangeName}
                onChangeOutId={onChangeOutId}
                availableOutsId={availableOutId}
            />
        </div>
        <div className={styles.outputGroupButtonFrame}>
            <Button onClick={onAdd}>
                Ajouter
            </Button>
        </div>
    </div>
}
