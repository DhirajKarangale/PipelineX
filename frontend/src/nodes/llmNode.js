import { memo, useState } from "react";
import BaseNode from "./baseNode";
import { Brain } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

const MODELS = [
  { id: "gpt-4o-mini", label: "GPT-4o Mini" },
  { id: "gpt-4o", label: "GPT-4o" },
  { id: "gpt-4.1", label: "GPT-4.1" },
  { id: "claude-3-opus", label: "Claude 3 Opus" },
  { id: "claude-3-sonnet", label: "Claude 3 Sonnet" },
  { id: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
  { id: "llama-3-70b", label: "LLaMA 3 70B" },
];

const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || MODELS[0].id);
  const [prompt, setPrompt] = useState(data?.prompt || "");
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens ?? 512);

  const stop = (e) => e.stopPropagation();

  return (
    <BaseNode
      id={id}
      additionalStyle=""
      title="LLM"
      icon={Brain}
      inputs={[{ id: "prompt" }, { id: "max_tokens" }]}
      outputs={[{ id: "response" }]}
    >
      <div className="w-full flex flex-col gap-2 text-sm">

        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          onPointerDown={stop}
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150 cursor-pointer
          "
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>

        <TextareaAutosize
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onPointerDown={stop}
          placeholder="Enter prompt"
          minRows={2}
          className="
            w-full bg-gray-50 px-2 py-1 text-sm resize-none rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150 no-scrollbar 
          "
        />

        <input
          type="number"
          min={1}
          value={maxTokens}
          onChange={(e) => setMaxTokens(Number(e.target.value))}
          onPointerDown={stop}
          placeholder="Max tokens"
          className="
            w-full bg-gray-50 px-2 py-1 rounded-md
            border border-gray-400 outline-none
            focus:ring-1 focus:ring-gray-400/50
            transition-all duration-150
          "
        />

        <div className="text-xs text-gray-500 italic">
          Prompt → LLM → Response
        </div>
      </div>
    </BaseNode>
  );
};

export default memo(LLMNode);
