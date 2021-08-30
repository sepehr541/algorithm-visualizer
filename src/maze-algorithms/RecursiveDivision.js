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
        return Orientation[Math.floor(Math.random() * 2)];
    }
};

const makeWalls = (row, col, hole, width, height, isHor) => {
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
    return res
}

const GenerateMaze = (row, col, width, height) => {
    return RecursiveDivision(row, col, width, height, Orientation.HOR);
}

const RecursiveDivision = (row, col, width, height, orientation) => {
    if (width < 2 || height < 2) return [];
    const isHor = orientation === Orientation.HOR;
    if (isHor) {
        const wallRow = row + rand(height);
        const hole = col + rand(width);
        const heightOne = wallRow - row - 1, heightTwo = height - wallRow;
        const newWalls = makeWalls(wallRow, col, hole, width, height, isHor);
        const divOne = RecursiveDivision(row, col, width, heightOne, chooseOrientation(width, heightOne));
        const divTwo = RecursiveDivision(wallRow, col, width, heightTwo, chooseOrientation(width, heightTwo));
        return _.union(newWalls, divOne, divTwo);
    } else {
        const wallColumn = col + rand(width);
        const hole = row + rand(height);
        const widthOne = wallColumn - col - 1, widthTwo = width - wallColumn;
        const newWalls = makeWalls(row, wallColumn, hole, width, height, isHor);
        const divOne = RecursiveDivision(row, col, widthOne, height, chooseOrientation(widthOne, height));
        const divTwo = RecursiveDivision(row, wallColumn, widthTwo, height, chooseOrientation(widthTwo, height));
        return _.union(newWalls, divOne, divTwo);
    }
}

export default GenerateMaze;