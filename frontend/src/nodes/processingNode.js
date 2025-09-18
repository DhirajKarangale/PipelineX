import React from "react";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { GiProcessor } from "react-icons/gi";

export const ProcessingNode = ({ id, data }) => {
  const handles = [
    { type: "source", position: Position.Right, id: "process" },
    { type: "target", position: Position.Left, id: "input" },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<GiProcessor />}
      title="Processing"
      handles={handles}
      additionalStyles={{
        fontWeight: "bold",
        borderRadius: 6,
        backgroundColor: "#f5f5f7",
      }}
    >
      <div>
        <span style={{ fontSize: 14, color: "#333" }}>
          This is a processing Node
        </span>
      </div>
    </BaseNode>
  );
};