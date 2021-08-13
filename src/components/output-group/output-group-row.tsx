import React, { FunctionComponent, useState } from "react";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../button/button";
import {OutputGroup, OutputGroupSU} from '../../type/outputGroup'
import {OutputGroupWithoutId} from "../../type/outputGroup";
import {BoxCardWrapper} from "../box/box-card-wrapper";

import styles from './output-group-row.module.sass'

type OutputGroupRowEditProps = {
    outputGroup: OutputGroupWithoutId,
    onChangeName: (name: string) => void,
    onChangeOutId: (outId: string) => void,
    availableOutsId: Array<string>
}

type OutputGroupRowViewProps = {
    outputGroup : OutputGroup,
    onDelete: () => void
}

type OutputGroupRowProps = {
    outputGroupSU: OutputGroupSU,
    onChangeName: (name: string) => void,
    onChangeOutId: (outId: string) => void,
    onDelete: () => void
}

type OutputGroupOutTagProps = {
    tagName: string
}

type OutputGroupOutCheckboxProps = {
    name: string,
    onChange: () => void,
    checked: boolean
}

/**
 * OutputGroupOutTag
 * @param tagName
 * @constructor
 */
const OutputGroupOutTag: FunctionComponent<OutputGroupOutTagProps> = ({tagName}) => {
    return <div className={styles.outputGroupTagContainer}>
        <label>{tagName}</label>
    </div>
}

/**
 * OutputGroupOutCheckbox
 * @param name
 * @param onChange
 * @param checked
 * @constructor
 */
const OutputGroupOutCheckbox: FunctionComponent<OutputGroupOutCheckboxProps> = ({name, onChange, checked}) => {
    return <div className={styles.outputGroupCheckBoxContainer}>
        <button onClick={onChange} focus={checked ? 'focus' : undefined}>
            {name}
        </button>
    </div>
}

/**
 * OutputGroupRowEdit
 * @param outputGroup
 * @param onChangeName
 * @param onChangeOutId
 * @param availableOutsId
 * @constructor
 */
export const OutputGroupRowEdit: FunctionComponent<OutputGroupRowEditProps> = ({outputGroup, onChangeName, onChangeOutId, availableOutsId}) => {
    return <div className={styles.rowEditContainer}>
        <div className={styles.rowInputNameFrame}>
            <input
                placeholder='Nom du groupe...'
                value={outputGroup.name}
                onChange={e => onChangeName(e.target.value)}
            />
        </div>
        <div className={styles.rowInputCheckBoxFrame}>
            {availableOutsId.map(availableOutId =>  <OutputGroupOutCheckbox
                name={availableOutId}
                onChange={() => onChangeOutId(availableOutId)}
                checked={outputGroup.outId.indexOf(availableOutId) >= 0}/>
            )}
        </div>
    </div>
}

/**
 * OutputGroupRowView
 * @param outputGroupCU
 * @param onDelete
 * @constructor
 */
const OutputGroupRowView: FunctionComponent<OutputGroupRowViewProps> = ({outputGroup, onDelete}) => {
    return <div className={styles.rowViewContainer}>
        <div className={styles.rowViewNameFrame}>
            <label>{outputGroup.name}</label>
        </div>
        <div className={styles.rowViewOutIdFrame}>
            {outputGroup.outId.map(outId => <OutputGroupOutTag key={outId} tagName={outId}/>)}
        </div>
        <div className={styles.rowViewDeleteButtonFrame}>
            <Button onClick={onDelete}>Supprimer</Button>
        </div>
    </div>
}

/**
 * OutputGroupRow
 * @param outputGroupCU
 * @param onChangeOutId
 * @param onChangeName
 * @param onDelete
 * @constructor
 */
export const OutputGroupRow: FunctionComponent<OutputGroupRowProps> = (
    {
        outputGroupSU,
        onChangeOutId,
        onChangeName,
        onDelete
    }) => {
    const [readOnly, setReadOnly] = useState(true)

    const toggleReadOnlyMode = () => {
        setReadOnly(!readOnly)
    }

    let updated = outputGroupSU.store.name !== outputGroupSU.updated.name
        || JSON.stringify(outputGroupSU.store.outId.sort()) !== JSON.stringify(outputGroupSU.updated.outId.sort())

    if (readOnly) {
        return <BoxCardWrapper
            buttons={[
                {
                    onClick: toggleReadOnlyMode,
                    name: 'Editer'
                }
            ]}
            focus={updated}
            icon={faLayerGroup}
        >
            <OutputGroupRowView
                outputGroup={outputGroupSU.store}
                onDelete={onDelete}
            />
        </BoxCardWrapper>
    }
    return <BoxCardWrapper
        buttons={[
            {
                onClick: toggleReadOnlyMode,
                name: 'Retour'
            }
        ]}
        focus={updated}
        icon={faLayerGroup}
    >
        <OutputGroupRowEdit
            onChangeName={onChangeName}
            onChangeOutId={onChangeOutId}
            availableOutsId={['out 1', 'out 2']}
            outputGroup={{...outputGroupSU.updated}}
        />
    </BoxCardWrapper>
}
