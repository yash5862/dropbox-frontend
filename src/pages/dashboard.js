import React, { useEffect, useMemo, useState } from "react";
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

  const fileTypes = {
    word: { 
      mimes: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      image: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.document'
    },
    image: {
      mimes: ['image/gif', 'image/jpeg', 'image/png'],
      image: 'https://drive-thirdparty.googleusercontent.com/16/type/image/png'
    },
    pdf: {
      mimes: [ 'application/pdf' ],
      image: 'https://drive-thirdparty.googleusercontent.com/16/type/application/pdf'
    },
    excel: {
      mimes: [ 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ],
      image: 'https://drive-thirdparty.googleusercontent.com/16/type/application/vnd.google-apps.spreadsheet'
    }
  }

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

  const getFileIconByMime = useMemo(() => (mime) => {
    console.log('Object.keys[fileTypes]', Object.keys(fileTypes));
    const fileType = Object.keys(fileTypes).find((type) => {
      return fileTypes[type].mimes.includes(mime);
    }) || 'other'

    return fileTypes[fileType]?.image || '';
  }, [filesData])

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
                  <div className="boxFile">
                    <img src={getFileIconByMime(file.mime)} className="img-fluid"></img>
                  </div>
                  <div className="FileName d-flex">
                    <img
                      src={getFileIconByMime(file.mime)}
                      className="icon"
                      tooltip={file.originalName}
                    ></img>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="tooltip-bottom" style={{position: 'fixed'}}>
                          {file.originalName}
                        </Tooltip>
                      }
                    >
                      <p>{file.originalName}</p>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
