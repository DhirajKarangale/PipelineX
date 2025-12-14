import BaseNode from "./baseNode";
import { Type } from "lucide-react";
import { memo, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useUpdateNodeInternals } from "reactflow";

const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);
  const updateNodeInternals = useUpdateNodeInternals();

  const JS_KEYWORDS = new Set([
    "break", "case", "catch", "class", "const", "continue", "debugger", "default",
    "delete", "do", "else", "export", "extends", "finally", "for", "function", "if",
    "import", "in", "instanceof", "new", "return", "super", "switch", "this", "throw",
    "try", "typeof", "var", "void", "while", "with", "yield", "let", "static", "enum",
    "await", "implements", "package", "protected", "interface", "private", "public",
  ]);

  const isValidJSVariable = (name) => {
    if (!name) return false;
    if (!/^[$A-Z_][0-9A-Z_$]*$/i.test(name)) return false;
    if (JS_KEYWORDS.has(name)) return false;
    return true;
  }

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    updateVariables(value);
  }

  const updateVariables = (textValue) => {
    const matches = textValue.match(/\{\{([^}]+)\}\}/g) || [];
    const vars = matches.map(m => m.slice(2, -2).trim()).filter(isValidJSVariable);

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