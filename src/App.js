import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css';
import Grid from './grid/Grid';
import ControlBar from './controlbar/ControlBar';
import { WIDTH, HEIGHT } from './Constants';
import { getType } from './path-finding-algorithms/Utils';
import ItemTypes from './ItemTypes';
import AlgMap from './path-finding-algorithms/index';
import { isPath } from './path-finding-algorithms/Utils';
import GenerateMaze from './maze-algorithms/RecursiveDivision';

const paintCellsAnimated = (cellsToPaint, duration, className) => {
  return Promise.all(cellsToPaint.map((cell, i) => {
    const elm = document.getElementById(`${cell.i}.${cell.j}`);
    return new Promise((resolve) => setTimeout(() => {
      elm.classList.add(className);
      resolve()
    }, duration * i));
  }));
};

const paintInstantly = (visited, path) => {
  visited.forEach(cell => {
    const elm = document.getElementById(`${cell.i}.${cell.j}`);
    elm.classList.add(isPath(path, cell) ? 'pathInstant' : 'visitedInstant');
  });
};

const clearPaint = () => {
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const elm = document.getElementById(`${i}.${j}`);
      elm.classList.remove('visited');
      elm.classList.remove('path');
      elm.classList.remove('visitedInstant');
      elm.classList.remove('pathInstant');
    }
  }
};

const animate = async (visited, path) => {
  await paintCellsAnimated(visited, 25, 'visited');
  await paintCellsAnimated(path, 30, 'path');
}

const runAlgorithmAnimated = async (alg, walls, start, end) => {
  const [visited, path] = alg(walls, start, end);
  await animate(visited, path);
};

const runAlgorithmInstant = (alg, walls, start, end) => {
  const [visited, path] = alg(walls, start, end);
  clearPaint();
  paintInstantly(visited, path);
};

function App() {
  const [source, setSource] = useState({ i: 0, j: 0 });
  const [dest, setDest] = useState({ i: HEIGHT - 1, j: WIDTH - 1 });
  const [walls, setWalls] = useState([]);
  const [isAnimated, setAnimated] = useState(false);
  const setWall = (coords) => {
    const newWalls = [...walls];
    newWalls.push(coords);
    setWalls(newWalls);
  }
  const removeWall = (coords) => {
    const newWalls = walls.filter(wall => !(wall.i === coords.i && wall.j === coords.j));
    setWalls(newWalls);
  }

  const AlgKeys = Object.keys(AlgMap);
  const [alg, setAlg] = useState(AlgKeys[0]);
  const clear = () => {
    setAnimated(false);
    setWalls([]);
    clearPaint();
  };

  return <DndProvider backend={HTML5Backend}>
    <ControlBar
      algKeys={AlgKeys}
      setAlg={setAlg}
      runAlg={async () => { setAnimated(true); await runAlgorithmAnimated(AlgMap[alg], walls, source, dest) }}
      clear={clear}
      generateMaze={() => { 
        clear();
        const newWalls = GenerateMaze(0, 0, WIDTH, HEIGHT, source, dest);
        setWalls(newWalls);
      }}
    />
    <Grid
      setSource={setSource}
      setDest={setDest}
      setWall={setWall}
      removeWall={removeWall}
      getType={(coords) => getType(coords, walls, source, dest)}
      handleRedrawOnReposition={(type, coords) => {
        if (isAnimated) {
          if (type === ItemTypes.SOURCE) {
            runAlgorithmInstant(AlgMap[alg], walls, coords, dest);
          } else if (type === ItemTypes.DEST) {
            runAlgorithmInstant(AlgMap[alg], walls, source, coords);
          }
        }
      }}
    />
  </DndProvider>
};

export default App;
