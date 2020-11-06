import { customAlphabet } from "nanoid/non-secure"

const ID = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10)
const checkedID = fn => {
    let id = ID()
    while (fn(id)) {
        id = ID()
    }
    return id
}

export { ID, checkedID }