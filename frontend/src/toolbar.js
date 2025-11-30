import { DraggableNode } from "./draggableNode";
import { GiProcessor } from "react-icons/gi";
import { BiAnalyse } from "react-icons/bi";
import { SubmitButton } from "./submit";
import {
  MdInput,
  MdTransform,
  MdTextFields,
  MdOutput,
  MdUpload,
  MdOutlineMergeType,
} from "react-icons/md";

export const PipelineToolbar = () => {
  const iconSize = 22;

  return (
    <div
      style={{
        padding: "5px 10px",
        backgroundColor: "#FFFFFF",
        borderRadius: "0px",
        boxShadow: "0 0px 40px rgba(0, 0, 0, 0.1)",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        flexWrap: "wrap",
        rowGap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "10px",

          rowGap: "10px",
          flex: "1 1 auto",
        }}
      >
        <DraggableNode
          type="customInput"
          label="Input"
          icon={<MdInput size={iconSize} />}
        />
        <DraggableNode
          type="customOutput"
          label="Output"
          icon={<MdOutput size={iconSize} />}
        />
        <DraggableNode
          type="text"
          label="Text"
          icon={<MdTextFields size={iconSize} />}
        />
        <DraggableNode type="llm" label="LLM" icon={<MdInput size={iconSize} />} />

        <DraggableNode
          type="fileUpload"
          label="File Upload"
          icon={<MdUpload size={iconSize} />}
        />

        <DraggableNode
          type="processing"
          label="Processing"
          icon={<GiProcessor size={iconSize} />}
        />
        <DraggableNode
          type="decision"
          label="Decision"
          icon={<MdTransform size={iconSize} />}
        />
        <DraggableNode
          ResultNode
          type="merge"
          label="Merge"
          icon={<MdOutlineMergeType size={iconSize} />}
        />

        <DraggableNode
          type="result"
          label="Result"
          icon={<BiAnalyse size={iconSize} />}
        />
      </div>

      <div style={{ flexShrink: 0 }}>
        <SubmitButton />
      </div>

    </div>
  );
};
