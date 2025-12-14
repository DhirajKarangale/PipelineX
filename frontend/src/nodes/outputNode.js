import BaseNode from "./baseNode";
import { Package } from "lucide-react";
import { memo, useState } from "react";

const OutputNode = ({ id, data }) => {
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));

  const handleNameChange = (e) => {
    e.stopPropagation();
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    e.stopPropagation();
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="Output"
      icon={Package}
      inputs={[{ id: "" }]}
      outputs={[{ id: "output" }]}
    >
      <div className="w-full flex flex-col gap-2">
        <input
          type="text"
          value={currName}
          onChange={(e) => handleNameChange(e)}
          placeholder="Output name"
          className="
            w-full bg-gray-50 text-sm px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150
          "
        />

        <select
          value={outputType}
          onChange={(e) => handleTypeChange(e)}
          className="
            w-full bg-gray-50 text-sm px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150
            cursor-pointer
          "
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>

        <div className="text-xs text-gray-500 italic">
          Output will be emitted as <span className="font-medium">{outputType}</span>
        </div>
      </div>
    </BaseNode>
  );
}

export default memo(OutputNode);