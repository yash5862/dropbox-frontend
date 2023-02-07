import { Button } from "bootstrap";
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
      <div>
        <div className="d-flex">
          <div className="sideBar">
            <div className="logo">
              <h1>DropBox</h1>
            </div>
            <Button className="logout">Log out</Button>
          </div>
          <div className="dashbordBody">
            <div className="header"></div>
            <div className="row m-5">
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-sm-2 col-12">
                <div className="boxFileMain">
                  <div className="boxFile"></div>
                  <div className="FileName d-flex">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2965/2965335.png"
                      className="icon"
                    ></img>
                    <p>
                      <strong>File name</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="container">
        <div {...getRootProps({ className: "dropzone disabled" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
      <Button onClick={uploadFiles}>Upload</Button>
    </>
  );
};
