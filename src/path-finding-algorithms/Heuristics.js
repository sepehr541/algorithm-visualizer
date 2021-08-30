export const Manhattan = (a, b) => {
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j);
};

export const PointDistance = (a, b) => {
    return Math.floor(
        Math.sqrt(
            Math.pow((b.i - a.i), 2) +
            Math.pow((b.j - a.j), 2)
        ));
};

