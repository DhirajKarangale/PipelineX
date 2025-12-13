import BaseNode from "./baseNode";
import { LogIn } from "lucide-react";
import { memo, useState } from "react";

const INPUT_TYPES = [
  { id: "Text", label: "Text" },
  { id: "File", label: "File" },
];

const InputNode = ({ id, data }) => {
  const [type, setType] = useState(data?.outputType || "Text");
  const [name, setName] = useState(
    data?.outputName || id.replace("customInput-", "input_")
  );

  const stop = (e) => e.stopPropagation();

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="Input"
      icon={LogIn}
      inputs={[]}
      outputs={[{ id: "input" }]}
    >
      <div className="w-full flex flex-col gap-2 text-sm">

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onPointerDown={stop}
          placeholder="Input name"
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150
          "
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          onPointerDown={stop}
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150 cursor-pointer
          "
        >
          {INPUT_TYPES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>

        <div className="text-xs text-gray-500 italic">
          Provides {type.toLowerCase()} input to the flow
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(InputNode);