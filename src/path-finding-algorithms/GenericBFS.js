import MinHeap from './MinHeap';
import { getNeighbors, getPath, isWall } from './Utils';
import { WIDTH, HEIGHT} from '../Constants';
import _ from 'lodash';

const GenericBFS = (walls, start, dest, costFunction) => {
    const nodeMap = _.range(HEIGHT).map(i => _.range(WIDTH).map(j => ({
            i, j, distance: Infinity, isWall: isWall(walls, { i, j })
        })
    ));
    const startNode = nodeMap[start.i][start.j];
    startNode.distance = 0;
    
    const queue = new MinHeap(costFunction);
    queue.insert(startNode);
    
    const visited = [];
    while (queue.length() !== 0) {
        const { i, j, isVisited, isWall } = queue.pop();

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
                    queue.insert(neighbor);
                }
            })
            curr.isVisited = true;
            visited.push(curr);
        }
    }

    const path = getPath(visited[visited.length - 1], dest);
    return [visited, path.reverse()];
}

export default GenericBFS;