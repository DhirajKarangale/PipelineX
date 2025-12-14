import BaseNode from "./baseNode";
import { Clock } from "lucide-react";
import { memo, useState } from "react";

const DelayNode = ({ id, data }) => {
  const [duration, setDuration] = useState(data?.duration ?? 1000);

  const stop = (e) => e.stopPropagation();

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="Delay"
      icon={Clock}
      inputs={[{ id: "trigger" }, { id: "duration" }]}
      outputs={[{ id: "delayed" }]}
    >
      <div className="w-full flex flex-col gap-2 text-sm">

        <input
          type="number"
          min={0}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          onPointerDown={stop}
          placeholder="Delay (ms)"
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150
          "
        />

        <div className="text-xs text-gray-500 italic">
          Delays execution by {duration} ms
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(DelayNode);
