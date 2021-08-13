import { FunctionComponent } from 'react'
import { OutputGroupRow } from './output-group-row'
import { Button } from '../button/button'

import styles from './output-group-table.module.sass'
import {OutputGroupSU} from "../../type/outputGroup";

type OutputGroupTableProps = {
    outputGroupsSU: Array<OutputGroupSU>,
    onChangeName: (name: string, outputGroupSU: OutputGroupSU) => void,
    onChangeOutId: (outId: string, outputGroupSU: OutputGroupSU) => void,
    onDelete: (outputGroupSU: OutputGroupSU) => void,
    onUpdate: () => void,

}

export const OutputGroupTable: FunctionComponent<OutputGroupTableProps> = (
    {
        outputGroupsSU,
        onChangeName,
        onChangeOutId,
        onDelete,
        onUpdate
    }
) => {

    return <div className={styles.outGroupTableContainer}>
        <div className={styles.outGroupTableFrame}>
            {outputGroupsSU.map(outputGroupSU => <OutputGroupRow
                key={outputGroupSU.store.id}
                outputGroupSU={outputGroupSU}
                onChangeOutId={outId => onChangeOutId(outId, outputGroupSU)}
                onChangeName={name => onChangeName(name, outputGroupSU)}
                onDelete={() => onDelete(outputGroupSU)}
            />)}
        </div>
        <div className={styles.outGroupTableSaveButtonFrame}>
            <Button onClick={onUpdate}>
                Enregistrer
            </Button>
        </div>
    </div>
}
