import React, { useState, useCallback } from "react";
import { BaseNode } from "./baseNode";
import { Handle, Position } from "reactflow";
import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "../store";
import { BsTextareaT } from "react-icons/bs";

export const TextNode = ({ id, data, isConnectable }) => {
  const [text, setText] = useState(data?.text || "{{input}}");

  const { updateNodeField } = useStore((state) => ({
    updateNodeField: state.updateNodeField,
  }));

  const handleTextChange = useCallback(
    (event) => {
      const newText = event.target.value;
      setText(newText);
      updateNodeField(id, "text", newText);
    },
    [id, updateNodeField]
  );

  const extractVariables = (text) => {
    const regex = /{{\s*(\w+)\s*}}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      variables.push(match[1]);
    }
    return variables;
  };

  const variables = extractVariables(text);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      icon={<BsTextareaT />}
      additionalStyles={{
        borderRadius: 6,
        backgroundColor: "#f5f5f7",
        padding: 10,
        minWidth: 180,
      }}
    >
      {variables.map((variable, index) => (
        <Handle
          key={`left-${variable}`}
          type="target"
          position={Position.Left}
          id={`left-${variable}`}
          style={{
            top: `${(100 / (variables.length + 1)) * (index + 1)}%`,
            background: "#555",
          }}
          isConnectable={isConnectable}
        />
      ))}

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          top: "50%",
          background: "#555",
        }}
        isConnectable={isConnectable}
      />

      <label style={{ display: "block", marginTop: 6 }}>
        <div style={{ fontWeight: "bold", marginBottom: 4, color: "#333", display: "flex", alignItems: "center", gap: 4 }}>
          <BsTextareaT /> Text
        </div>
        <TextareaAutosize
          minRows={1}
          maxRows={50}
          value={text}
          onChange={handleTextChange}
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 5,
            fontSize: 14,
            boxSizing: "border-box",
          }}
        />
      </label>
    </BaseNode>
  );
};