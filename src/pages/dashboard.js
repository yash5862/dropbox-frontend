import React, { useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import "../index.css";
import { apiClient } from "../common/general";
import { AppSettings } from "../appSettings";

export const Dashboard = () => {
  const [filesData, setFilesData] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled: true,
  });

  const getUserFiles = () => {
    apiClient({
      url: AppSettings.apiBaseURL + "files",
      method: "GET",
    }).then((res) => {
      setFilesData(res.data);
    });
  };

  useEffect(() => {
    console.log("called");
    getUserFiles();
  }, []);

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const uploadFiles = () => {};

  console.log(filesData);

  return (
    <>
      <div className="dashbordBody">
        <div className="header"></div>
        <div className="row m-5">
          {filesData.map((file, index) => {
            return (
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                      tooltip={file.originalName}
                    ></img>
                    <p>
                      <strong tooltip={file.originalName}>{ file.originalName }</strong>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <section>
          <div {...getRootProps({ className: "dropzone disabled" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      <Button onClick={uploadFiles}>Upload</Button>
          </section> */}
    </>
  );
};
