import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../login/userSlice';
import "./GridElement.css"

function GridElement(imageUrl) {
    const user = useSelector(selectUser);
    console.log(imageUrl.imageUrl)
    return (
        <div className="gridElement">
            {/* <h3>Grid Element</h3> */}
            <img src={imageUrl.imageUrl} className="image" alt="" />
        </div>
    );
}

export default GridElement;