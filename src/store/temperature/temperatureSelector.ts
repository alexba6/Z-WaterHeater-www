import { TemperatureStore} from "./temperatureReducer";

export const temperatureSelector = (temperatureReducer: {temperature: TemperatureStore}) => temperatureReducer.temperature

