// NodeForm.js
import React from "react";

const NodeForm = ({
  name,
  type,
  onNameChange,
  onTypeChange,
  typeOptions,
  label,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          border: "1px solid grey",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{label} Name</span>
        <input
          label="Name:"
          type="text"
          value={name}
          onChange={onNameChange}
          style={{
            resize: "none",
            height: "15px",
            outline: "none",
            backgroundColor: "transparent",
            border: "none",
            paddingTop: "10px",
          }}
        />
      </div>
      <div
        style={{
          border: "1px solid grey",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        <label style={{ fontWeight: "bold" }}>
          Type
          <select
            value={type}
            onChange={onTypeChange}
            style={{
              marginLeft: "15px",
              width: "8rem",
              marginTop: "10px",
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            {typeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default NodeForm;
