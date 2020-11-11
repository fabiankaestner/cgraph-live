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
