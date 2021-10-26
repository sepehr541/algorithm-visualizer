/**
 * source
 * http://weblog.jamisbuck.org/2011/1/12/maze-generation-recursive-division-algorithm
 */

import _ from "lodash";

const rand = (range) => {
    let rand = Math.floor(Math.random() * range);
    return rand;
}

const Orientation = {
    HOR: 'hor',
    VER: 'ver'
}


const chooseOrientation = (width, height) => {
    if (width < height) {
        return Orientation.HOR
    } else if (height < width) {
        return Orientation.VER
    } else {
        return Orientation[rand(2)];
    }
};

const makeWalls = (row, col, hole, width, height, isHor, start, end) => {
    const res = [];
    if (isHor) {
        while (col < width) {
            if (col !== hole) {
                res.push({
                    i: row,
                    j: col
                })
            }
            col++;
        }
    } else {
        while (row < height) {
            if (row !== hole) {
                res.push({
                    i: row,
                    j: col
                })
            }
            row++;
        }
    }
    return res.filter(wall => !_.eq(wall, start) && !_.eq(wall, end));
}

const GenerateMaze = (row, col, width, height, start, end) => {
    return RecursiveDivision(row, col, width, height, Orientation.VER, start, end);
}

const RecursiveDivision = (row, col, width, height, orientation, start, end) => {
    if (width < 3 || height < 3) return [];
    const isHor = orientation === Orientation.HOR;
    if (isHor) {
        const wallRow = row + Math.floor(height / 2);
        const hole = col + rand(width);
        const heightOne = wallRow - row, heightTwo = height - wallRow;
        const newWalls = makeWalls(wallRow, col, hole, width, height, isHor, start, end);
        const divOne = RecursiveDivision(row, col, width, heightOne, chooseOrientation(width, heightOne), start, end);
        const divTwo = RecursiveDivision(wallRow + 1, col, width, heightTwo, chooseOrientation(width, heightTwo), start, end);
        return _.union(newWalls, divOne, divTwo);
    } else {
        const wallColumn = col + Math.floor(width / 2);
        const hole = row + rand(height);
        const widthOne = wallColumn - col, widthTwo = width - wallColumn;
        const newWalls = makeWalls(row, wallColumn, hole, width, height, isHor, start, end);
        const divOne = RecursiveDivision(row, col, widthOne, height, chooseOrientation(widthOne, height), start, end);
        const divTwo = RecursiveDivision(row, wallColumn + 1, widthTwo, height, chooseOrientation(widthTwo, height), start, end);
        return _.union(newWalls, divOne, divTwo);
    }
}

export default GenerateMaze;