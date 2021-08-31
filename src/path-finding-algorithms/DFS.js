import { getNeighbors, getPath, isWall } from './Utils';
import { WIDTH, HEIGHT} from '../Constants';
import _ from 'lodash';

const DFS = (walls, start, dest) => {
    const nodeMap = _.range(HEIGHT).map(i => _.range(WIDTH).map(j => ({
            i, j, distance: Infinity, isWall: isWall(walls, { i, j })
        })
    ));
    const startNode = nodeMap[start.i][start.j];
    startNode.distance = 0;
    
    const stack = [];
    stack.push(startNode);
    
    const visited = [];
    while (stack.length !== 0) {
        const { i, j, isVisited, isWall } = stack.shift();

        if (isWall) continue;
        const curr = nodeMap[i][j];
        if (i === dest.i && j === dest.j) {
            visited.push(curr);
            break;
        }

        if (!isVisited) {
            const neighbors = getNeighbors(nodeMap, i, j);
            neighbors.forEach(neighbor => {
                if (curr.distance + 1 < neighbor.distance) {
                    neighbor.parent = curr;
                    neighbor.distance = curr.distance + 1;
                }
                if (!neighbor.isVisited) {
                    stack.unshift(neighbor);
                }
            })
            curr.isVisited = true;
            visited.push(curr);
        }
    }

    const path = getPath(visited[visited.length - 1], dest);
    return [visited, path.reverse()];
}

export default DFS;