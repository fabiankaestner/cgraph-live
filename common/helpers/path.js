export function comparePath(p1, p2) {
    // check two paths for equality

    if (p1.length !== p2.length) {
        return false;
    }

    for (let i = 0; i < p1.length; i++) {
        if (p1[i] !== p2[i]) {
            return false;
        }
    }
    return true;
}

export function containsPath(arr, path) {
    // check if the array contains a given path

    console.log(arr);

    for (let compare of arr) {
        console.log(compare, path);
        if (comparePath(compare, path)) {
            return true;
        }
    }
}
