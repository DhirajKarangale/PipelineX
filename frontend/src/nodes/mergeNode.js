import BaseNode from "./baseNode";
import { Merge } from "lucide-react";
import { memo, useState } from "react";

const STRATEGIES = [
  { id: "concat", label: "Concat (text)" },
  { id: "json", label: "JSON Object" },
  { id: "array", label: "Array" },
];

const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || "concat");

  const stop = (e) => e.stopPropagation();

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="Merge"
      icon={Merge}
      inputs={[{ id: "a" }, { id: "b" }]}
      outputs={[{ id: "merged" }]}
    >
      <div className="w-full flex flex-col gap-2 text-sm">

        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          onPointerDown={stop}
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150 cursor-pointer
          "
        >
          {STRATEGIES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        <div className="text-xs text-gray-500 italic">
          Merges inputs using <span className="font-medium">{strategy}</span>
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(MergeNode);
