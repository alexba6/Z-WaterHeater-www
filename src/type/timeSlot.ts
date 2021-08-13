export type TimeSlot = {
    id: string,
    groupId: string,
    start: string,
    end: string
}

export type TimeSlotWithoutId = {
    groupId: string,
    start: string,
    end: string
}

export type TimeSlotWithUpdate = {
    store: TimeSlot,
    updated: TimeSlotWithoutId
}
