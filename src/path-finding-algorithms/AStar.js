import { Manhattan as h } from './Heuristics';
import GenericBFS from './GenericBFS';

const AStar = (matrix, start, dest) => {
    const maxDist = h(start, dest);
    const p = 1 / maxDist;
    const costFunction = (a, b) => a && b && h(a, dest) * (1 + p) + a.distance < h(b, dest) * (1 + p) + b.distance;
    return GenericBFS(matrix, start, dest, costFunction);
}

export default AStar;