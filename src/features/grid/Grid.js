import React from 'react';
import { useSelector } from 'react-redux';
import { selectUrls } from '../appHeader/urlSlice';
import GridElement from './GridElement';
import "./Grid.css"

function Grid() {
    const imgUrls = useSelector(selectUrls);
    imgUrls.forEach(element => {
        // console.log(element)
    });
    return (
        <div className="card-background">
            {imgUrls.length > 0 ? (
                <div className="card">
                    <div className="grid">
                        {imgUrls.map((imageFile, i) => (
                            <GridElement className="gridElement" imageUrl={imageFile} key={i} />
                        ))}
                    </div>
                </div>
            ) : (
                    <div />
                )}
        </div>
    );
}

export default Grid;