import React, { useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import "../index.css";
import { apiClient } from "../common/general";
import { AppSettings } from "../appSettings";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import thumbDoc from "../assets/images/thumbnail-doc.png";
import thumbExl from "../assets/images/thumbnail-exl.png";
import thumbPdf from "../assets/images/thumbnail-pdf.png";
import thumbImg from "../assets/images/thumbnail-img.png";
import thumbWord from "../assets/images/thumbnail-word.png";

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
          {/* {filesData.map((file, index) => {
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
          })} */}
          <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
            <div className="boxFileMain">
              <div className="boxFile">
                <img src={thumbDoc} className="img-fluid"></img>
              </div>
              <div className="FileName d-flex">
                <img
                  src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document"
                  className="icon"
                  tooltip="Hello"
                ></img>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom" style={{position: 'fixed'}}>
                      Hello Hello Hello Hello Hello
                    </Tooltip>
                  }
                >
                  <p>Hello Hello Hello Hello Hello</p>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
            <div className="boxFileMain">
              <div className="boxFile">
                <img src={thumbExl} className="img-fluid"></img>
              </div>
              <div className="FileName d-flex">
                <img
                  src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet"
                  className="icon"
                  tooltip="Hello"
                ></img>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom" style={{position: 'fixed'}}>
                      Hello Hello Hello Hello Hello
                    </Tooltip>
                  }
                >
                  <p>Hello Hello Hello Hello Hello</p>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
            <div className="boxFileMain">
              <div className="boxFile">
                <img src={thumbImg} className="img-fluid"></img>
              </div>
              <div className="FileName d-flex">
                <img
                  src="https://drive-thirdparty.googleusercontent.com/16/type/image/png"
                  className="icon"
                  tooltip="Hello"
                ></img>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom" style={{position: 'fixed'}}>
                      Hello Hello Hello Hello Hello
                    </Tooltip>
                  }
                >
                  <p>Hello Hello Hello Hello Hello</p>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
            <div className="boxFileMain">
              <div className="boxFile">
                <img src={thumbPdf} className="img-fluid"></img>
              </div>
              <div className="FileName d-flex">
                <img
                  src="	https://drive-thirdparty.googleusercontent.com/16/type/application/pdf"
                  className="icon"
                  tooltip="Hello"
                ></img>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom" style={{position: 'fixed'}}>
                      Hello Hello Hello Hello Hello
                    </Tooltip>
                  }
                >
                  <p>Hello Hello Hello Hello Hello</p>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
            <div className="boxFileMain">
              <div className="boxFile">
                <img src={thumbWord} className="img-fluid"></img>
              </div>
              <div className="FileName d-flex">
                <img
                  src="https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="icon"
                  tooltip="Hello"
                ></img>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom" style={{position: 'fixed'}}>
                      Hello Hello Hello Hello Hello
                    </Tooltip>
                  }
                >
                  <p>Hello Hello Hello Hello Hello</p>
                </OverlayTrigger>
              </div>
            </div>
          </div>
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
