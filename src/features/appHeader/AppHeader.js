import React, { useEffect, useState } from "react";
import "./AppHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUrls, setSelectedUrls, resetSelectedUrls } from "./urlSlice";
import { storage, db } from "../../firebase";
import { selectUser } from "../login/userSlice";
import { Button } from "@material-ui/core";
import axios from "axios";
import { selectToken } from "../login/tokenSlice";

function AppHeader() {
  const dispatch = useDispatch();
  const imgUrls = useSelector(selectUrls);
  const user = useSelector(selectUser);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const token = useSelector(selectToken);
  const [dateTime, setDateTime] = useState("");

  const fileSelectedHandler = (event) => {
    if (event.target.files.length > 0) {
      setProgress(0);
      dispatch(resetSelectedUrls([]));
      setSelectedFiles(event.target.files);
    }
  };

  useEffect(() => {
    console.log(selectedFiles);
    upload();
  }, [selectedFiles]);

  useEffect(() => {
    if (progress === 99) setProgress(0);
  }, [progress]);

  const handleUpload = () => {
    upload();
  };

  useEffect(() => {
    console.log(dateTime);
  }, [dateTime]);

  function upload() {
    const date = new Date().toUTCString();
    setDateTime(date);

    for (let i = 0; i < selectedFiles.length; i++) {
      const image = selectedFiles[i];
      const uploadTask = storage
        .ref(`images/${user.email}/${dateTime}/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(user.email)
            .child(dateTime)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              dispatch(setSelectedUrls(url));
            });
        }
      );
    }
    // setDateTime("")
  }

  const handleApiRequest = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const files = Array.from(selectedFiles);
    let fileNames = files.map(a => a.name);

    const data = {
      userEmail: user.email,
      fileNames: fileNames,
      dateTime: dateTime,
    };

    console.log(data);
    console.log(JSON.stringify(data));

    axios
      .post("https://localhost:44354/api/imageshuffle/", JSON.stringify(data), {
        headers: headers,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="appHeader">
      <h2>Image Shuffler</h2>
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload FIles...
      </label>
      <input
        id="file-upload"
        style={{ display: "none" }}
        type="file"
        multiple
        onChange={fileSelectedHandler}
      />
      <button onClick={handleApiRequest}>Shuffle</button>
      <progress value={progress} max="100" />
    </div>
  );
}

export default AppHeader;
