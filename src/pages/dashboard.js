import React from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Button } from "react-bootstrap";
import "../index.css";

export const Dashboard = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    disabled: true,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const uploadFiles = () => {};

  return (
    <>
        <div {...getRootProps({ className: "dropzone disabled" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      <Button onClick={uploadFiles}>Upload</Button>
    </>
  );
};
