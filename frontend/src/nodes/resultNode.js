import React from "react";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { BiAnalyse } from "react-icons/bi";

export const ResultNode = ({ id, data }) => {
  const handles = [
    { type: "source", position: Position.Left, id: "input" },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<BiAnalyse />}
      title="Result"
      handles={handles}
      additionalStyles={{
        fontWeight: "bold",
        borderRadius: 6,
        backgroundColor: "#f5f5f7",
      }}
    >
      <div>
        <span style={{ fontSize: 14, color: "#333" }}>This is a result Node</span>
      </div>
    </BaseNode>
  );
};