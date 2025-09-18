import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";

export const BaseNode = React.memo(({ id, data, title, handles = [], additionalStyles = {}, icon, children }) => {
  const { selectedNode, setSelectedNode } = useStore((state) => ({
    selectedNode: state.selectedNode,
    setSelectedNode: state.setSelectedNode,
  }));

  const isSelected = selectedNode === id;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setSelectedNode(id);
      }}
      style={{
        width: 220,
        border: `2px solid ${isSelected ? "#3b82f6" : "#bbb"}`, // blue if selected
        borderRadius: 8,
        backgroundColor: "#f5f5f7",
        padding: 10,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: "pointer",
        ...additionalStyles,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6, fontWeight: 500, fontSize: 14, color: "#333" }}>
        {icon && <div style={{ marginRight: 8 }}>{icon}</div>}
        <span>{title}</span>
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            width: 10,
            height: 10,
            background: "#888",
            borderRadius: "50%",
            border: "1px solid white",
            ...handle.style,
          }}
        />
      ))}

      <div style={{ padding: "10px 5px 5px 5px" }}>{children}</div>
    </div>
  );
});