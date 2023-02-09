import React, { useMemo } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import other from "../assets/images/other.png";
import docs from "../assets/images/google-docs.png";
import pdf from "../assets/images/pdf.png";
import sheets from "../assets/images/sheets.png";
import img from "../assets/images/img.png";

export const FileGrid = (props) => {
  const { file, isSelected, onSelect } = props;

  console.log('isSelected', isSelected);

  const fileTypes = {
    word: {
      mimes: [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
      image: docs,
    },
    image: {
      mimes: ["image/gif", "image/jpeg", "image/png"],
      image: img,
    },
    pdf: {
      mimes: ["application/pdf"],
      image: pdf,
    },
    excel: {
      mimes: [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      image: sheets,
    },
    other: {
      image: other,
    },
  };

  const getFileIconByMime = useMemo(
    () => (mime) => {
      const fileType =
        Object.keys(fileTypes).find((type) => {
          if (type == "other") return "";
          return fileTypes[type].mimes.includes(mime);
        }) || "other";

      return fileTypes[fileType]?.image || "";
    },
    [file]
  );

  return (
    <>
      <div className={`boxFileMain ${isSelected && 'selected'}`}>
        <input
          type="checkbox"
          className="check"
          checked={isSelected}
          onChange={() => onSelect(file._id)}
        />
        <div className="boxFile">
          <img
            src={getFileIconByMime(file.mime)}
            className="img-fluid thumbnail"
          ></img>
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
              <Tooltip id="tooltip-bottom" style={{ position: "fixed" }}>
                {file.originalName}
              </Tooltip>
            }
          >
            <p>{file.originalName}</p>
          </OverlayTrigger>
        </div>
      </div>
    </>
  );
};
