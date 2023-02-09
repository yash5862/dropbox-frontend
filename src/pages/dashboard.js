import React, { useEffect, useMemo, useState } from "react";
import "../index.css";
import { apiClient } from "../common/general";
import { AppSettings } from "../appSettings";
import { FileGrid } from "../components/fileGrid";
import { BsTrash } from "react-icons/bs";
import { Button, Modal } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import upload from "../assets/images/upload.png";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const [filesData, setFilesData] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const getUserFiles = () => {
    apiClient({
      url: AppSettings.apiBaseURL + "files",
      method: "GET",
    }).then((res) => {
      setFilesData(res.data);
      resetStates();
    });
  };

  useEffect(() => {
    console.log("called");
    getUserFiles();
  }, []);

  const onSelectFile = (id) => {
    const selectedFilesInstance = [...selectedFiles];
    const selectionIndex = selectedFilesInstance.indexOf(id);
    if (selectionIndex > -1) {
      selectedFilesInstance.splice(selectionIndex, 1);
    } else {
      selectedFilesInstance.push(id);
    }
    console.log("setting selectedfile", selectedFilesInstance);
    setSelectedFiles([...selectedFilesInstance]);
  };

  const selectAllToggle = () => {
    if (selectAll) {
      setSelectedFiles([]);
      setSelectAll(false);
    } else {
      setSelectedFiles(filesData.map((file) => file._id));
      setSelectAll(!selectAll);
    }
  };

  const deleteFiles = () => {
    apiClient({
      url: AppSettings.apiBaseURL + "files",
      method: "DELETE",
      data: { ids: selectedFiles },
    }).then((res) => {
      getUserFiles();
      setShowConfirm(false);
    });
  };

  const resetStates = () => {
    setSelectedFiles([]);
    setSelectAll(false);
  };

  const handleClose = () => {
    setShowConfirm(false);
  };

  console.log(selectedFiles);
  const { getRootProps, acceptedFiles } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));
  return (
    <>
      <div className="dashbordBody">
        <div className="header"></div>
        <div className="row m-5">
          <div className="col-12">
            <div {...getRootProps({ className: "dropzone" })}>
              <div className="dropText">
                <img src={upload} alt="upload" className="upload img-fluid" />
                <p>Drag your file here</p>
                <p>
                  <span>or</span>
                </p>
                <Button>Click to upload file</Button>
              </div>
            </div>
            <aside className="fileView">
              <h4>Uploaded Files :</h4>
              <ul>{files}</ul>
            </aside>
          </div>
          <div className="col-12 ">
            <div className="d-flex justify-content-end mb-3">
              <div className="d-flex selectAll">
                <input
                  type="checkbox"
                  className="checkAll"
                  onChange={selectAllToggle}
                  disabled={!filesData.length}
                  checked={
                    filesData.length && selectedFiles.length == filesData.length
                      ? true
                      : selectAll
                  }
                />
                <p className="m-0">Select All</p>
              </div>
              {selectAll || selectedFiles.length ? (
                <div
                  className="d-flex selectAll m-0 cursor-pointer"
                  onClick={() => setShowConfirm(true)}
                >
                  <BsTrash
                    size={18}
                    style={{ alignSelf: "center", marginRight: "10px" }}
                  />
                  <p className="m-0">Delete</p>
                </div>
              ) : null}
            </div>
          </div>
          {filesData && filesData.length ? (
            filesData.map((file) => {
              return (
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
                  <FileGrid
                    file={file}
                    onSelect={onSelectFile}
                    isSelected={
                      selectAll ? true : selectedFiles.indexOf(file._id) > -1
                    }
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center">No Files uploaded! Please upload</div>
          )}
        </div>
      </div>

      <Modal show={showConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedFiles.length} files? !!
          Action is not reversible !!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteFiles}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
