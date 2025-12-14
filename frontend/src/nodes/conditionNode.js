import BaseNode from "./baseNode";
import { Split } from "lucide-react";
import { memo, useState } from "react";

const OPERATORS = [
  { id: "==", label: "Equals (==)" },
  { id: "!=", label: "Not equals (!=)" },
  { id: ">", label: "Greater than (>)" },
  { id: "<", label: "Less than (<)" },
];
const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || "==");

  const stop = (e) => e.stopPropagation();

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="Condition"
      icon={Split}
      inputs={[{ id: "a" }, { id: "b" }]}
      outputs={[{ id: "true" }, { id: "false" }]}
    >
      <div className="w-full flex flex-col gap-2 text-sm">

        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          onPointerDown={stop}
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150 cursor-pointer
          "
        >
          {OPERATORS.map((op) => (
            <option key={op.id} value={op.id}>
              {op.label}
            </option>
          ))}
        </select>

        <div className="text-xs text-gray-500 italic">
          Compares input A with input B
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(ConditionNode);
