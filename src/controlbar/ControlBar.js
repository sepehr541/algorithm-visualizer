import React from 'react';
import styles from './ControlBar.module.css';

function ControlBar({ algKeys, setAlg, runAlg, clear, generateMaze }) {
    return (
        <div  className={styles.controlbar}>
            <select onChange={e => setAlg(e.target.value)}>
                {algKeys.map(key => <option key={key} value={key}>{key}</option>)}
            </select>
            <button onClick={() => runAlg()}>Run Algorithm</button>
            <button onClick={() => clear()}>Reset</button>
            <button onClick={() => generateMaze()}>Generate Maze</button>
        </div>
    );
}

export default ControlBar;