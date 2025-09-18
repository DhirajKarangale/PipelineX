import React, { useState } from "react";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { MdUpload } from "react-icons/md";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    display: "block",
    marginBottom: 8,
  },
  fileName: {
    marginTop: 8,
    fontSize: 12,
    color: "#555",
  },
};

export const FileUploadNode = ({ id, data }) => {
  const { file: initialFile } = data || {};
  const [file, setFile] = useState(initialFile || null);
  const [fileName, setFileName] = useState(initialFile?.name || "");

  const handles = [
    { type: "target", position: Position.Left, id: "start" },
    { type: "source", position: Position.Right, id: "start" },
  ];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Upload File"
      icon={<MdUpload />}
      handles={handles}
      additionalStyles={{
        fontWeight: "bold",
        borderRadius: 6,
        backgroundColor: "#f5f5f7",
      }}
    >
      <form style={styles.form}>
        <label htmlFor={`file-upload-${id}`} style={styles.label}>
          <span style={{ fontWeight: "normal", fontSize: 12, color: "#333" }}>
            Upload File
          </span>
        </label>
        <input
          id={`file-upload-${id}`}
          type="file"
          accept=".jpg, .png, .pdf"
          onChange={handleFileChange}
        />
        {fileName && <p style={styles.fileName}>Selected file: {fileName}</p>}
      </form>
    </BaseNode>
  );
};