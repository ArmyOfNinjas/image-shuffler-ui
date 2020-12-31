import React, { useEffect, useState } from 'react';
import "./AppHeader.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFiles } from "./filesSlice"
import { selectFiles } from "./filesSlice"

function AppHeader({ setSelectedState }) {
    const dispatch = useDispatch()
    const selectedFiles = useSelector(selectFiles);

    const fileSelectedHandler = event => {
        if (event.target.files.length > 0) {
            setSelectedState(event.target.files)
            // dispatch(setSelectedFiles(event.target.files));
        }
    }


    const fileUploadHandler = () => {
        const formData = new FormData();
        formData.append("image", selectedFiles, selectedFiles[0].name)

        // paste API url here
        axios.post("url", formData)
            .then(res => { console.log(res); },
                error => { console.log(error) }
            );
    }

    return (
        <div className="appHeader">
            <h2>This is Navbar</h2>
            <input type="file" multiple onChange={fileSelectedHandler} />
        </div>
    );
}

export default AppHeader;