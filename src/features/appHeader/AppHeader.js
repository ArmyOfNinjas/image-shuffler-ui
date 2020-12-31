import React, { useEffect, useState } from 'react';
import "./AppHeader.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFiles } from "./filesSlice"
import { selectFiles } from "./filesSlice"
import { selectUrls, setSelectedUrls } from "./urlSlice"
import { storage, db } from "../firebase"
import firebase from "../firebase"

function AppHeader() {
    const dispatch = useDispatch()
    const selectedFiles = useSelector(selectFiles);
    const imgUrls = useSelector(selectUrls);
    const [progress, setProgress] = useState(0);

    const [selectedState, setSelectedState] = useState([])

    const fileSelectedHandler = event => {
        if (event.target.files.length > 0) {
            setSelectedState(event.target.files)
            // dispatch(setSelectedFiles(event.target.files));
        }
    }

    useEffect(() => {
        console.log(selectedState)
    }, [selectedState])


    const handleUpload = () => {
        for (let i = 0; i < selectedState.length; i++) {
            const image = selectedState[i]
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress)
                },
                error => { console.log(error) },
                () => {
                    storage
                        .ref('images')
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            dispatch(setSelectedUrls(url))
                        });
                });
            setProgress(0)
        }
    }



    return (
        <div className="appHeader">
            <h2>This is Navbar</h2>
            <input type="file" multiple onChange={fileSelectedHandler} />
            <button onClick={handleUpload}>Upload</button>
            <progress value={progress} max="100" />
        </div>
    );
}

export default AppHeader;