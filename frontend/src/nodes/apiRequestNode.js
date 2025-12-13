import BaseNode from "./baseNode";
import { Globe } from "lucide-react";
import { memo, useState } from "react";

const METHODS = ["GET", "POST", "PUT", "DELETE"];

const ApiRequestNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || "GET");
  const [url, setUrl] = useState(data?.url || "");
  const [timeout, setTimeout] = useState(data?.timeout ?? 5000);

  const stop = (e) => e.stopPropagation();

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="API Request"
      icon={Globe}
      inputs={[{ id: "url" }, { id: "body" }, { id: "headers" }]}
      outputs={[{ id: "response" }, { id: "status" }]}
    >
      <div className="w-full flex flex-col gap-2 text-sm">

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          onPointerDown={stop}
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150 cursor-pointer
          "
        >
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onPointerDown={stop}
          placeholder="https://api.example.com"
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150
          "
        />

        <input
          type="number"
          min={0}
          value={timeout}
          onChange={(e) => setTimeout(Number(e.target.value))}
          onPointerDown={stop}
          placeholder="Timeout (ms)"
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150
          "
        />

        <div className="text-xs text-gray-500 italic">
          Sends {method} request and outputs response
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(ApiRequestNode);
