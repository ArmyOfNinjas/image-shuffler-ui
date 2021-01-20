import React, { useEffect, useState } from "react";
import "./AppHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUrls, setSelectedUrls, resetSelectedUrls } from "./urlSlice";
import { resetFileNames, selectFileNames, setFileNames } from "./fileNameSlice";
import { selectDateTime, setDate } from "./dateTimeSlice";
import { storage, db } from "../../firebase";
import { selectUser } from "../login/userSlice";
import { selectToken } from "../login/tokenSlice";
import axios from "axios";
import { selectNamesUrls, setNamesUrls, resetNamesUrls } from "./nameUrlSlice";

function AppHeader() {
  const dispatch = useDispatch();
  const imgUrls = useSelector(selectUrls);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dateTime = useSelector(selectDateTime);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [dateTime, setDateTime] = useState("");
  const namesUrls = useSelector(selectNamesUrls);
  const fileNames = useSelector(selectFileNames);

  const fileSelectedHandler = (event) => {
    if (event.target.files.length > 0) {
      setProgress(0);
      dispatch(resetSelectedUrls([]));
      setSelectedFiles(event.target.files);
    }
  };

  useEffect(() => {
    // console.log(selectedFiles);
    upload();
  }, [selectedFiles]);

  useEffect(() => {
    if (progress === 99) setProgress(0);
  }, [progress]);

  useEffect(() => {
    console.log(fileNames);
  }, [fileNames]);

  function upload() {
    let date = new Date().toUTCString();
    // setDateTime(date);
    dispatch(setDate(date));
    let names = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const image = selectedFiles[i];
      // dispatch(setFileNames(image.name));
      names.push(image.name);
      console.log(image.name);
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
              const name = image.name;
              dispatch(setDate(dateTime));
              dispatch(setNamesUrls({ name, url }));
              // setDateTime(dateTime);
              // dispatch(setSelectedUrls(url));
              // dispatch(setNamesUrls({ "name": image.name, "url": url }))
            });
        }
      );
    }

    dispatch(resetFileNames(names));
  }

  const handleApiRequest = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const files = Array.from(selectedFiles);
    let fileNames = files.map((a) => a.name);

    const data = {
      userEmail: user.email,
      fileNames: fileNames,
      dateTime: dateTime,
    };

    console.log(data);

    axios
      .post("https://localhost:44354/api/imageshuffle/", JSON.stringify(data), {
        headers: headers,
      })
      .then(async function (response) {
        await new Promise((r) => setTimeout(r, 2000));
        dispatch(setFileNames(response.data));
        downloadImgUrls(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function downloadImgUrls(data) {
    console.log(data);
    dispatch(resetNamesUrls([]));
    let names = [];
    for (let i = 0; i < data.length; i++) {
      const image = data[i];
      names.push(image);
      console.log(image);
      storage
        .ref("images")
        .child(user.email)
        .child(dateTime)
        .child("objectsDetected")
        .child(image)
        .getDownloadURL()
        .then((url) => {
          // dispatch(setFileNames(image));
          // dispatch(setSelectedUrls(url));
          const name = image;
          // console.log(name)
          dispatch(setNamesUrls({ name, url }));
        });
    }
    dispatch(resetFileNames(names));
  }

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
