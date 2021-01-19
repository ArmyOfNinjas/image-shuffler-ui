import React from 'react';
import { useSelector } from 'react-redux';
import { selectUrls } from '../appHeader/urlSlice';
import GridElement from './GridElement';
import "./Grid.css"
import { selectNamesUrls } from "../appHeader/nameUrlSlice";
import { selectFileNames } from "../appHeader/fileNameSlice";

function Grid() {
    const imgUrls = useSelector(selectUrls);
    const namesUrls = useSelector(selectNamesUrls);
    const fileNames = useSelector(selectFileNames);

    let urlsMap = new Map()
    namesUrls.forEach(element => {
        urlsMap.set(element.name, element.url);
    });

    return (
        <div className="card-background">
            {fileNames.length > 0 ? (
                <div className="card">
                    <div className="grid">
                        {fileNames.map((imageFile, i) => (
                            <GridElement className="gridElement" imageUrl={urlsMap.get(imageFile)} key={i} />
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