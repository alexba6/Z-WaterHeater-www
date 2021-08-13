export type ControlMode = 'ON' | 'OFF' | 'AUTO'

export type Control = {
    enableGroupId: string | null,
    mode: ControlMode,
    returnAutoIn: number | undefined
}