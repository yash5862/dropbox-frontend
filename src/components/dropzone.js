
import React, { useEffect } from 'react';

export const DropZoneComponent = ({onDrag}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const dragCounter = React.useRef(0);

  useEffect(() => {
    
  });
  
  const handleDrag = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  const handleDragIn = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);
  const handleDragOut = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current > 0) return;
    setIsDragging(false);
  }, []);
  const handleDrop = React.useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      dragCounter.current = 0;
      console.log(event.dataTransfer.files);
      event.dataTransfer.clearData();
    }
  }, []);
  
  React.useEffect(() => {
    window.addEventListener("dragenter", handleDragIn);
    window.addEventListener("dragleave", handleDragOut);
    window.addEventListener("dragover", handleDrag);
    window.addEventListener("drop", handleDrop);
    return function cleanUp() {
      window.removeEventListener("dragenter", handleDragIn);
      window.removeEventListener("dragleave", handleDragOut);
      window.removeEventListener("dragover", handleDrag);
      window.removeEventListener("drop", handleDrop);
    };
  });

  return <></>
}

// import Dropzone, { useDropzone } from "react-dropzone";

// export const DropZoneComponent = () => {
//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
//     disabled: true,
//   });

//   const files = acceptedFiles.map((file) => (
//     <li key={file.name}>
//       {file.name} - {file.size} bytes
//     </li>
//   ));

//   const uploadFiles = () => {};

//   return (
//     <section>
//       <div {...getRootProps({ className: "dropzone disabled" })}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       </div>
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//   );
// };
