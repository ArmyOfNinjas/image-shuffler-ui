import React from 'react';
import { useSelector } from 'react-redux';
import { selectFiles } from "../appHeader/filesSlice"
import GridElement from './GridElement';

function Grid(props) {
    const selectedFiles = useSelector(selectFiles);

    return (
        <div className="grid">
            {selectedFiles.map((imageName) => (
                <GridElement image={imageName} />
            ))}
        </div>
    );
}

export default Grid;