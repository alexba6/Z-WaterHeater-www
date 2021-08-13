import {FunctionComponent, useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalTemplate } from '../template/global-template'
import { outputGroupsSelector } from '../store/output-groups/outputGroupsSelector'
import {
    addOutputGroup,
    deleteOutputGroup,
    loadOutputGroup,
    updateOutputGroup
} from '../store/output-groups/outputGroupsActions'
import { Box, Title } from '../components/box/box-structure'
import { OutputGroupTable } from '../components/output-group/output-group-table'
import { OutputGroupAdd } from '../components/output-group/output-group-add'
import { OutputGroupSU, OutputGroupWithoutId } from '../type/outputGroup'


export const OutputGroupPage: FunctionComponent = () => {
    const AVAILABLE_OUT_ID = ['out 1', 'out 2']
    const dispatch = useDispatch()
    const outputGroupsStore = useSelector(outputGroupsSelector)
    const [outputGroupsSU, setOutputGroupSU] = useState<Array<OutputGroupSU>>([])
    const [outputGroupAdd, setOutputGroupAdd] = useState<OutputGroupWithoutId>({
        name: '',
        outId: []
    })

    const onChangeOutputGroupName = (name: string, outputGroupSU: OutputGroupSU) => {
        setOutputGroupSU(outputGroupsSU.map(currentOutputGroupSU => {
            if (currentOutputGroupSU.store.id === outputGroupSU.store.id) {
                currentOutputGroupSU.updated.name = name
            }
            return currentOutputGroupSU
        }))
    }

    const onChangeOutputGroupOutId = (outIdToggle: string, outputGroupSU: OutputGroupSU) => {
        setOutputGroupSU(outputGroupsSU.map(currentOutputGroupSU => {
            if (currentOutputGroupSU.store.id === outputGroupSU.store.id) {
                if (outputGroupSU.updated.outId.find(outId => outId === outIdToggle)) {
                    return {
                        ...currentOutputGroupSU,
                        updated: {
                            ...currentOutputGroupSU.updated,
                            outId: outputGroupSU.updated.outId.filter(outId => outId !== outIdToggle)
                        }
                    }
                }
                return {
                    ...currentOutputGroupSU,
                    updated: {
                        ...currentOutputGroupSU.updated,
                        outId: [...outputGroupSU.updated.outId, outIdToggle]
                    }
                }
            }
            return currentOutputGroupSU
        }))
    }

    const onDeleteOutputGroup = (outputGroupSU: OutputGroupSU) => {
        if (window.confirm('Voulez-vous vraiment supprimer ce groupe ?')) {
            dispatch(deleteOutputGroup(outputGroupSU.store))
        }
    }

    const onUpdateOutputGroup = () => {
        dispatch(updateOutputGroup(outputGroupsSU.filter(outputGroupSU => {
            return outputGroupSU.store.name !== outputGroupSU.updated.name ||
                JSON.stringify(outputGroupSU.store.outId.sort()) !== JSON.stringify(outputGroupSU.updated.outId.sort())
        }).map(outputGroupsSUToUpdate => {
            return {
                id: outputGroupsSUToUpdate.store.id,
                ...outputGroupsSUToUpdate.updated
            }
        })))
    }

    const loadOutputGroupSU = useCallback(() => {
        if (outputGroupsStore.status === 'READY') {
            setOutputGroupSU(outputGroupsStore.outputGroups.map(outputGroup => {
                return {
                    store: JSON.parse(JSON.stringify(outputGroup)),
                    updated: JSON.parse(JSON.stringify(outputGroup))
                }
            }))
        }
    }, [outputGroupsStore])

    const onAddOutputGroup = () => {
        dispatch(addOutputGroup(outputGroupAdd))
    }

    useEffect(() => {
        loadOutputGroupSU()
    }, [loadOutputGroupSU])

    useEffect(()  => {
        dispatch(loadOutputGroup())
    }, [dispatch])

    const loading = outputGroupsStore.status !== 'READY'

    return <GlobalTemplate>
        <Title title='Groupes relais'/>
        <Box title='Modifier' loading={loading}>
            <OutputGroupTable
                outputGroupsSU={outputGroupsSU}
                onChangeName={onChangeOutputGroupName}
                onChangeOutId={onChangeOutputGroupOutId}
                onDelete={onDeleteOutputGroup}
                onUpdate={onUpdateOutputGroup}
            />
        </Box>
        <Box title='Ajouter' loading={loading}>
            <OutputGroupAdd
                outputGroup={outputGroupAdd}
                onChangeName={name => setOutputGroupAdd({ ...outputGroupAdd, name })}
                onChangeOutId={outIdToggle => {
                    setOutputGroupAdd({
                        ...outputGroupAdd,
                        outId: outputGroupAdd.outId.find(outId => outId === outIdToggle) ?
                            outputGroupAdd.outId.filter(outId => outId !== outIdToggle)
                            : [...outputGroupAdd.outId, outIdToggle]
                    })
                }}
                onAdd={onAddOutputGroup}
                availableOutId={AVAILABLE_OUT_ID}
            />
        </Box>
    </GlobalTemplate>
}
