import {OutputGroup} from "../../type/outputGroup";


export type OutputGroupsSU = {
    store: OutputGroup
    updated: {
        name: string,
        outId: Array<string>
    }
}