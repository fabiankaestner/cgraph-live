import { parseStringAddress, getPathFromAddress } from "./address";

export function getStrAddressFromState(state, str) {
    const address = parseStringAddress(str);
    const path = getPathFromAddress(address);
    return getPathFromState(state, path);
}

export function getPathFromState(state, path) {
    let current = state;
    console.log("start", path);
    for (let seg of path) {
        console.log(current, current[seg], seg);
        if (current[seg]) {
            current = current[seg];
        } else {
            return undefined;
        }
    }
    console.log("end", current);
    return current;
}
