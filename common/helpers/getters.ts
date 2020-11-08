import { parseStringAddress, getPathFromAddress } from "./address";
import { State } from "../store/types/state";
import { StatePath } from "../store/types/stateTree";

export function getStrAddressFromState(state: State, str: string) {
    const address = parseStringAddress(str);
    if (!address) {
        return undefined;
    }
    const path = getPathFromAddress(address);
    return getPathFromState(state, path);
}

export function getPathFromState(state: State, path: StatePath): any {
    let current = state;
    for (let seg of path) {
        if (current[seg]) {
            current = current[seg];
        } else {
            return undefined;
        }
    }
    return current;
}
