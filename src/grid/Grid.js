import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import styles from './Grid.module.css';
import { useDrag, useDrop } from 'react-dnd';
import ItemType from '../ItemTypes';
import { WIDTH, HEIGHT } from '../Constants';

const IconMap = {
    source: '🏎️',
    dest: '🏁'
}

const Draggable = ({ type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }), [type]);
    return !isDragging && <div ref={drag}>{IconMap[type]}</div>;
}

const addRemoveWall = (type, coords, setWall, removeWall) => {
    if (type === ItemType.WALL) {
        removeWall(coords);
    } else if (type === ItemType.EMPTY) {
        setWall(coords);
    }
}

const Cell = ({ coords, type, handleDrop, isMouseDown, setMouseDown, setWall, removeWall, handleIsOver }) => {
    const [{ isOver, itemType }, drop] = useDrop(
        () => ({
            accept: [ItemType.SOURCE, ItemType.DEST],
            drop: (item) => handleDrop(item, coords),
            collect: monitor => ({
                isOver: monitor.isOver(),
                itemType: monitor.getItemType()
            })
        }), []);

    const isWall = type === ItemType.WALL;
    useEffect(() => {
        if (isOver && !isWall) {
            handleIsOver(itemType, coords);
        }
    }, [isOver, handleIsOver, itemType, coords, isWall])
    const id = `${coords.i}.${coords.j}`;
    const isEmpty = type === ItemType.EMPTY;
    return <div
        ref={drop}
        id={id}
        className={classNames(styles.cell, isWall && styles.wall)}
        onMouseDown={() => {
            if (isWall || isEmpty) {
                setMouseDown(true);
                addRemoveWall(type, coords, setWall, removeWall);
            }
        }}
        onMouseEnter={() => {
            if (isMouseDown) {
                addRemoveWall(type, coords, setWall, removeWall);
            }
        }}
        onMouseUp={() => {
            setMouseDown(false);
        }}
    >
        {!isWall && !isEmpty && <Draggable type={type} />}
    </div>;
};

const Grid = ({ setSource, setDest, setWall, removeWall, getType, handleRedrawOnReposition }) => {
    const handleDrop = (item, dropCoords) => {
        const { type } = item;
        if (type === ItemType.SOURCE) {
            setSource(dropCoords);
        } else if (type === ItemType.DEST) {
            setDest(dropCoords);
        }
    }
    const [isMouseDown, setMouseDown] = useState(false);
    return <>
        <div
            draggable={false}
            onMouseLeave={() => setMouseDown(false)}
            className={styles.grid}
        >
            {_.range(HEIGHT).map(i => <div key={i} className={styles.row}>{
                _.range(WIDTH).map(j => <Cell
                    key={`${i}.${j}`}
                    coords={{ i, j }}
                    type={getType({ i, j })}
                    handleDrop={handleDrop}
                    isMouseDown={isMouseDown}
                    setMouseDown={setMouseDown}
                    removeWall={removeWall}
                    setWall={setWall}
                    handleIsOver={handleRedrawOnReposition}
                />
                )}
            </div>)
            }
        </div>
    </>
};

export default Grid;