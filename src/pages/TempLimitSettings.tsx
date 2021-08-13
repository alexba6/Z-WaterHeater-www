import {FunctionComponent, useEffect} from "react";
import {GlobalTemplate} from "../template/global-template";
import {Box, Title} from "../components/box/box-structure";
import {useDispatch, useSelector} from "react-redux";
import {tempSensorSelector} from "../store/temp-sensors/tempSensorsSelector";
import {settingsTempLimitSelector} from "../store/settings-temp-limit/settingsTempLimitSelector";
import {loadTempSensors} from "../store/temp-sensors/tempSensorActions";
import {loadSettingsTempLimit, updateSettingsTempLimit} from "../store/settings-temp-limit/settingsTempLimitActions";
import {TempLimitTable} from "../components/settings/temp-limit-table";
import {SettingsTempLimit} from "../type/settings";


export const TempLimitSettings: FunctionComponent = () => {
    const tempSensors = useSelector(tempSensorSelector)
    const settingsTempLimitStore = useSelector(settingsTempLimitSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTempSensors())
        dispatch(loadSettingsTempLimit())
    }, [dispatch])

    const onUpdate = (settingsTempLimit: SettingsTempLimit) => {
        console.log(settingsTempLimit)
        dispatch(updateSettingsTempLimit(settingsTempLimit))
    }

    const loading = tempSensors.status === ('PENDING' || 'INIT') || settingsTempLimitStore.status === ('PENDING' || 'INIT')

    return <GlobalTemplate>
        <Title title='Température limite'/>
        <Box loading={loading}>
            <TempLimitTable
                error={settingsTempLimitStore.status === 'ERROR' ? settingsTempLimitStore.error?.message : null}
                settingsTempLimit={settingsTempLimitStore.settingsTempLimit}
                onUpdate={onUpdate}
                tempSensors={tempSensors.tempSensors}/>
        </Box>
    </GlobalTemplate>
}