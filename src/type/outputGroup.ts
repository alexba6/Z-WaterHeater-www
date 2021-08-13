
export type OutputGroup = {
    id: string,
    name: string,
    outId: Array<string>
}

export type OutputGroupWithoutId = {
    name: string,
    outId: Array<string>
}

export type OutputGroupSU = {
    store: OutputGroup,
    updated: OutputGroupWithoutId
}
