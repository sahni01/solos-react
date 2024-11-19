import React, { useState } from "react";
import AWS from 'aws-sdk';
import './App.css';
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);

  // const uploadFile = async () => {
  //   const { REACT_APP_BUCKET_NAME, REACT_APP_AWS_REGION, REACT_APP_AWS_ACCESS_ID, REACT_APP_AWS_SECRET_KEY } = process.env;

  //   AWS.config.update({
  //     accessKeyId: REACT_APP_AWS_ACCESS_ID,
  //     secretAccessKey: REACT_APP_AWS_SECRET_KEY,
  //   });

  //   const s3 = new AWS.S3({
  //     params: { Bucket: REACT_APP_BUCKET_NAME },
  //     region: REACT_APP_AWS_REGION,
  //   });

  //   if (!file) {
  //     alert("Please select a file to upload.");
  //     return;
  //   }

  //   try {
  //     const currentDate = new Date();
  //     const day = currentDate.getDate();
  //     const key = `${day}/${file.name}`;

  //     const params = {
  //       Bucket: REACT_APP_BUCKET_NAME,
  //       Key: key,
  //       Body: file,
  //       ACL: 'public-read'
  //     };

  //     const upload = s3.upload(params);

  //     upload.on("httpUploadProgress", (evt) => {
  //       console.log("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%");
  //     });

  //     await upload.promise();
  //     setFile(null);
  //     alert("File uploaded successfully.");
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     alert("Failed to upload file.");
  //   }
  // };


  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
  
    try {
      // Prepare FormData and append the file and optional alt text
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', "Media");
  
      // Set up Axios request configuration
      const config = {
        method: 'post',
        url: 'https://dev-console.sokos.io/api/media',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log("Uploading " + percentCompleted + "%");
        },
      };
  
      // Send request
      const response = await axios.request(config);
  
      if (response?.data?.doc?.url) {
        console.log("File uploaded successfully:", response.data);
        setFile(null);
        alert("File uploaded successfully.");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
      alert("Failed to upload file.");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="app-container">
      <div className="upload-container">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-button" onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
};

export default App;
