import {FunctionComponent, useCallback, useEffect, useState} from "react";
import {GlobalTemplate} from "../template/global-template";
import {Box, Title} from "../components/box/box-structure";
import {useDispatch, useSelector} from "react-redux";
import {outputGroupsSelector} from "../store/output-groups/outputGroupsSelector";
import {loadOutputGroup} from "../store/output-groups/outputGroupsActions";
import {Control, ControlMode} from "../type/control";
import FetchApi from "../api/http-fetch";
import {keyManager} from "../tools/authKey";
import {ControlInfo} from "../components/control/control-info";
import {ControlButtons} from "../components/control/control-buttons";


export const ControlPage: FunctionComponent = () => {
    const outputGroups = useSelector(outputGroupsSelector)
    const [control, setControl] = useState<Control | null>(null)

    const dispatch = useDispatch()

    const getControl = useCallback( async () => {
        const request = new FetchApi()
        try {
            setControl(await request.query('/api/control', {
                method: 'get',
                auth: keyManager.key
            }))
        }
        catch (e) {

        }
    }, [])

    const switchControl = async (mode: ControlMode, groupId: string | null = null) => {
        const request = new FetchApi()
        try {
            await request.query('/api/control/{mode}', {
                method: 'post',
                auth: keyManager.key,
                params: { mode },
                query: { groupId }
            })
            await getControl()
        }
        catch (e) {

        }
    }

    useEffect(() => {
        dispatch(loadOutputGroup())
        getControl().then()
    }, [dispatch, getControl])

    const loading = !control || outputGroups.status !== 'READY'

    return <GlobalTemplate>
        <Title title='Contrôle groupes'/>
        <Box title='Informations' loading={loading}>
            <ControlInfo
                control={control}
                outputGroups={outputGroups.outputGroups}
            />

        </Box>
        <Box title='Actions' loading={loading}>
            <ControlButtons
                control={control}
                outputGroups={outputGroups.outputGroups}
                onOff={() => switchControl('OFF')}
                onAuto={() => switchControl('AUTO')}
                onOn={outputGroup => switchControl('ON', outputGroup.id)}
            />
        </Box>
    </GlobalTemplate>
}
