import BaseNode from "./baseNode";
import { Type } from "lucide-react";
import { memo, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useUpdateNodeInternals } from "reactflow";

const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    updateVariables(value);
  }

  const updateVariables = (textValue) => {
    const matches = textValue.match(/\{\{([^}]+)\}\}/g) || [];
    const vars = matches.map((match) => match.slice(2, -2).trim());
    setVariables([...new Set(vars)]);
    updateNodeInternals(id);
  }

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="Text"
      icon={Type}
      inputs={variables.map((v) => ({ id: v }))}
      outputs={[{ id: "output" }]}
    >
      <TextareaAutosize
        minRows={1}
        value={text}
        onChange={(e) => handleTextChange(e)}
        placeholder="Enter text with {{variables}}"
        className="w-full bg-gray-50 p-1 text-sm resize-none outline-none no-scrollbar 
        border border-gray-400 focus:ring-1 focus:ring-gray-400/50 transition-all duration-150"
      />
      {variables.length > 0 && (
        <div className="w-full h-min bg-gray-200 rounded-md
          flex flex-wrap justify-start items-center px-2 py-1
         text-gray-700 text-sm italic">
          {variables.join(", ")}
        </div>
      )}
    </BaseNode>
  );
}

export default memo(TextNode);