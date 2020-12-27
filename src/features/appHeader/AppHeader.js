import React, { useState } from 'react';
import "./AppHeader.css";
import axios from "axios";

function AppHeader(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const fileSelectedHandler = event => {
        setSelectedFiles(event.target.files);
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