import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../login/userSlice';
import "./GridElement.css"

function GridElement(image) {
    const user = useSelector(selectUser);

    const fileDownloadHandler = () => {
        const formData = new FormData();
        formData.append("image", selectedFiles, selectedFiles[0].name)

        // paste API url here
        axios.fetch("url", user, image)
            .then(res => { console.log(res); return res; },
                error => { console.log(error) }
            );
    }

    return (
        <div className="gridElement">

            <img src={fileDownloadHandler} className="image" alt="" />
        </div>
    );
}

export default GridElement;