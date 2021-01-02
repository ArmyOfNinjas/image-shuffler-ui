import React from 'react';
import { useSelector } from 'react-redux';
import { selectFiles } from "../appHeader/filesSlice"
import { selectUrls } from '../appHeader/urlSlice';
import GridElement from './GridElement';
import "./Grid.css"

function Grid() {
    const imgUrls = useSelector(selectUrls);
    // console.log(imgUrls)
    return (
        <div className="grid">
            {imgUrls.map((imageFile) => (
                <GridElement className="gridElement" imageUrl={imageFile} key={imageFile} />
            ))}
        </div>
    );
}

export default Grid;