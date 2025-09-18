import React from "react";

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        width: "80px",
        height: "80px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: "transparent",
        justifyContent: "center",
        flexDirection: "column", 
        color: "#333", 
        fontSize: "14px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "0px",
        textAlign: "center",
        border: "1px solid #ccc",
      }}
      draggable
    >
      {icon && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "6px", 
          }}
        >
          {icon}
        </div>
      )}
      <span>{label}</span>
    </div>
  );
};