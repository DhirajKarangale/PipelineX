import React from "react";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { MdOutlineMergeType } from "react-icons/md";

export const MergeNode = ({ id, data }) => {
  const handles = [
    { type: "source", position: Position.Right, id: "merge" },
    { type: "target", position: Position.Left, id: "input1" },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      icon={<MdOutlineMergeType />}
      title="Merge"
      handles={handles}
      additionalStyles={{
        fontWeight: "bold",
        borderRadius: 6,
        backgroundColor: "#f5f5f7",
      }}
    >
      <div>
        <span style={{ fontSize: 14, color: "#333" }}>This is a merge Node</span>
      </div>
    </BaseNode>
  );
};