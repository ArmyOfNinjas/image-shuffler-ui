import React, { useEffect, useRef, useState } from 'react';
import "./AppHeader.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFiles } from "./filesSlice"
import { selectFiles } from "./filesSlice"
import { selectUrls, setSelectedUrls, resetSelectedUrls } from "./urlSlice"
import { storage, db } from "../firebase"
import { selectUser } from "../login/userSlice";
import firebase from "../firebase"
import { Button } from "@material-ui/core"

function AppHeader() {
    const dispatch = useDispatch()
    const imgUrls = useSelector(selectUrls);
    const user = useSelector(selectUser);
    const [progress, setProgress] = useState(0);

    const [selectedState, setSelectedState] = useState([])

    const fileSelectedHandler = event => {
        if (event.target.files.length > 0) {
            setSelectedState([]);
            setProgress(0);
            dispatch(resetSelectedUrls([]))
            setSelectedState(event.target.files);
        }
    }

    useEffect(() => {
        console.log(selectedState)
        upload();
    }, [selectedState])

    useEffect(() => {
        if (progress === 99) setProgress(0);
    }, [progress])

    const handleUpload = () => {
        upload();
    }

    function upload() {
        for (let i = 0; i < selectedState.length; i++) {
            const image = selectedState[i]
            const uploadTask = storage.ref(`images/${user.email}/${image.name}`).put(image);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
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
        }
    }

    return (
        <div className="appHeader">
            <h2>Image Shuffler</h2>
            <label for="file-upload" class="custom-file-upload">
                Upload FIles...
            </label>
            <input
                id="file-upload"
                style={{ display: 'none' }}
                type="file"
                multiple
                onChange={fileSelectedHandler}
            />
            {/* <button onClick={handleUpload}>Upload</button> */}
            <progress value={progress} max="100" />
        </div>
    );
}

export default AppHeader;