import React from "react";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { LuBrainCircuit } from "react-icons/lu";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: "33%" },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: "66%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      style: { top: "50%" },
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
      icon={<LuBrainCircuit />}
      additionalStyles={{
        fontWeight: "bold",
        borderRadius: 6,
        backgroundColor: "#f5f5f7",
      }}
    >
      <div>
        <span style={{ fontSize: 14, color: "#333" }}>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};