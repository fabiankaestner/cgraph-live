import { parseStringAddress, getPathFromAddress } from "./address"

export function getStrAddressFromState(state, str) {
    const address = parseStringAddress(str)
    const path = getPathFromAddress(address)
    return getPathFromState(state, path)
}


export function getPathFromState(state, path) {
    let current = state
    for (let seg of path) {
        if (current[seg]) {
            current = current[seg]
        } else {
            return undefined
        }
    }
    return current
}