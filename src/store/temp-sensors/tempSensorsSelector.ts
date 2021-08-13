import {TempSensorStore} from "./tempSensorsReducer";

export const tempSensorSelector = (tempSensorsReducer: {tempSensors: TempSensorStore}) => tempSensorsReducer.tempSensors
