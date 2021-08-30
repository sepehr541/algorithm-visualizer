import { Manhattan as h } from './Heuristics';
import GenericBFS from './GenericBFS';

const GreedyBFS = (matrix, start, dest) => {
    const costFunction = (a, b) => a && b && h(a, dest) < h(b, dest);
    return GenericBFS(matrix, start, dest, costFunction);
}

export default GreedyBFS;