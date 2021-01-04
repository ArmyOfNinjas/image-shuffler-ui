import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../login/userSlice';
import "./GridElement.css"

function GridElement(imageUrl) {
    // const user = useSelector(selectUser);
    // console.log(imageUrl.imageUrl)
    return (
        <div className="gridElement">
            <div className="sixteen-by-nine aspect-ratio"></div>
            <img src={imageUrl.imageUrl} className="image" alt="" />
        </div>
    );
}

export default GridElement;