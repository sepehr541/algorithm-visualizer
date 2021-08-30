import _ from 'lodash';
import ItemTypes from '../ItemTypes';

export const getPath = (end, dest) => {
    const path = [];
    if (end.i === dest.i && end.j === dest.j) {
        while (end) {
            path.push(end);
            end = end.parent;
        }
    }
    return path;
}

export const getNeighbors = (matrix, i, j) => {
    const result = [];
    const sameRow = matrix[i];
    const left = sameRow[j - 1], right = sameRow[j + 1];
    if (right) result.push(right);
    if (left) result.push(left);

    const upRow = matrix[i - 1];
    if (upRow && upRow[j]) result.push(upRow[j]);

    const downRow = matrix[i + 1];
    if (downRow && downRow[j]) result.push(downRow[j]);
    return result;
};

export const isWall = (walls, coords) => {
    return !! _.find(walls, wall => _.isEqual(coords, wall));
};

export const isPath = (path, coords) => {
    return _.find(path, p => p.i === coords.i && p.j === coords.j);
}

export const getType = (coords, walls, source, dest) => {
    if (isWall(walls, coords)) {
        return ItemTypes.WALL;
    } else if (_.isEqual(coords, source)) {
        return ItemTypes.SOURCE;
    } else if (_.isEqual(coords, dest)) {
        return ItemTypes.DEST;
    }
    return ItemTypes.EMPTY;
};
