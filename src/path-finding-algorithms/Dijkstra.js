import GenericBFS from "./GenericBFS";

const Dijkstra = (matrix, start, dest) => {
    const costFunction = (i, j) => i && j && i.distance < j.distance;
    return GenericBFS(matrix, start, dest, costFunction);
}

export default Dijkstra;