import React, { useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import "../index.css";
import { apiClient } from "../common/general";
import { AppSettings } from "../appSettings";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import other from "../assets/images/other.png";
import docs from "../assets/images/google-docs.png";
import pdf from "../assets/images/pdf.png";
import sheets from "../assets/images/sheets.png";
// import word from "../assets/images/word.png";
import img from "../assets/images/img.png";

export const Dashboard = () => {
  const [filesData, setFilesData] = useState([]);

  const fileTypes = {
    word: { 
      mimes: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      image: docs
    },
    image: {
      mimes: ['image/gif', 'image/jpeg', 'image/png'],
      image: img
    },
    pdf: {
      mimes: [ 'application/pdf' ],
      image: pdf
    },
    excel: {
      mimes: [ 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ],
      image: sheets
    },
    other: {
      image: other
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
      if (type == 'other') return '';
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
                    <img src={getFileIconByMime(file.mime)} className="img-fluid thumbnail"></img>
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
