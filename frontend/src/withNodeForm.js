// withNodeForm.js
import React from "react";
import { BaseNode } from "./nodes/baseNode";

import { Position } from "reactflow";
import { MdInput } from "react-icons/md";
import NodeForm from "./NodeForm";

const withNodeForm = (WrappedComponent, nodeType) => {
  return ({ id, data }) => {
    const [currName, setCurrName] = React.useState(
      data?.[`${nodeType}Name`] ||
        id.replace(`custom${nodeType}-`, `${nodeType.toLowerCase()}_`)
    );
    const [nodeTypeValue, setNodeTypeValue] = React.useState(
      data[`${nodeType}Type`] || "Text"
    );

    const handles =
      nodeType === "Input"
        ? [{ type: "source", position: Position.Right, id: "value" }]
        : [{ type: "target", position: Position.Left, id: "value" }];

    return (
      <BaseNode
        id={id}
        data={data}
        title={nodeType}
        handles={handles}
        additionalStyles={{
          padding: "10px",
          fontWeight: "bold",
          borderRadius: "5px",
        }}
        icon={<MdInput size={18} />}
      >
        <NodeForm
          name={currName}
          type={nodeTypeValue}
          onNameChange={(e) => setCurrName(e.target.value)}
          onTypeChange={(e) => setNodeTypeValue(e.target.value)}
          typeOptions={
            nodeType === "Input" ? ["Text", "File"] : ["Text", "Image"]
          }
          label="Field"
        />
      </BaseNode>
    );
  };
};

export default withNodeForm;
