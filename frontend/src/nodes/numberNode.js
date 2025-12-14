import BaseNode from "./baseNode";
import { Hash } from "lucide-react";
import { memo, useState } from "react";

const NumberNode = ({ id, data }) => {
    const [value, setValue] = useState(data?.value ?? 0);

    const stop = (e) => e.stopPropagation();

    return (
        <BaseNode
            id={id}
            additionalStyle=""
            title="Number"
            icon={Hash}
            inputs={[]}
            outputs={[{ id: "number" }]}
        >
            <div className="w-full flex flex-col gap-2 text-sm">

                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    onPointerDown={stop}
                    placeholder="Enter number"
                    className="
                    w-full bg-gray-50 px-2 py-1 rounded-md
                    border border-gray-400 outline-none
                    focus:ring-1 focus:ring-gray-400/50
                    transition-all duration-150"
                />

                <div className="text-xs text-gray-500 italic">
                    Outputs a numeric value
                </div>
            </div>
        </BaseNode>
    );
};

export default memo(NumberNode);