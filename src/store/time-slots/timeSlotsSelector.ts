import {TimeSlotsStore} from "./timeSlotsReducer";


export const timeSlotsFilterByStart = (timeSlotsReducer: {timeSlots: TimeSlotsStore}): TimeSlotsStore => {
    return {
        ...timeSlotsReducer.timeSlots,
        timeSlots: timeSlotsReducer.timeSlots.timeSlots.sort()
    }
}
