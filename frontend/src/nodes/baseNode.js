import { memo } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/store";
import { XCircle } from "lucide-react";
import { Handle, Position } from "reactflow";

const BaseNode = ({
    id,
    icon: Icon,
    additionalStyle,
    title,
    children,
    inputs = [],
    outputs = [],
}) => {
    const { selectedNode, setSelectedNode, removeNode } = useStore((state) => ({
        removeNode: state.removeNode,
        selectedNode: state.selectedNode,
        setSelectedNode: state.setSelectedNode,
    }));

    const isSelected = selectedNode === id;

    const handleRemove = (e) => {
        e.stopPropagation();
        removeNode(id);
    };

    return (
        <motion.div
            onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(id);
            }}

            initial={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}

            whileHover={{
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            }}

            animate={{
                scale: 1,
                opacity: 1,
                boxShadow: isSelected
                    ? "0 0 0 1px rgba(59,130,246,0.7)"
                    : "0 2px 6px rgba(0,0,0,0.08)",
            }}

            className={`${additionalStyle} w-[200px] min-h-[100px] bg-gray-100 p-2
                flex flex-col gap-2 border rounded-md cursor-pointer
                ${isSelected ? "border-blue-500" : "border-gray-400"}`}
        >
            <div className="flex items-center text-gray-600 text-sm">
                <div className="flex items-center gap-2 flex-1">
                    {Icon && <Icon size={14} />}
                    <span>{title}</span>
                </div>

                <motion.div
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <XCircle
                        size={16}
                        className="cursor-pointer hover:text-red-500"
                        onClick={handleRemove}
                    />
                </motion.div>
            </div>

            <div className="-mx-2 border-t border-gray-300/70" />

            <div>{children}</div>

            {inputs.map((input, index) => (
                <div key={index}>
                    <Handle
                        key={index}
                        type="target"
                        position={Position.Left}
                        id={`${id}-${input.id}`}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
                        className="handle"
                    />

                    {input.id && <div
                        className="absolute right-full mr-1
                            -translate-y-[110%]
                            max-w-[90px]
                            whitespace-nowrap overflow-hidden text-ellipsis
                            rounded border border-gray-300 bg-white
                            px-1 py-[1px]
                            text-[10px] leading-none italic text-gray-600
                            pointer-events-none"
                        style={{ top: `${((index + 1) * 100) / (inputs.length + 1)}%` }}
                    >
                        {input.id}
                    </div>}
                </div>
            ))}

            {outputs.map((output, index) => (
                <div key={index}>
                    <Handle
                        key={index}
                        type="source"
                        position={Position.Right}
                        id={`${id}-${output.id}`}
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
                        className="handle"
                    />

                    {output.id && (
                        <div
                            className="absolute left-full ml-1
                            -translate-y-[110%]
                            max-w-[90px]
                            whitespace-nowrap overflow-hidden text-ellipsis
                            rounded border border-gray-300 bg-white
                            px-1 py-[1px]
                            text-[10px] leading-none italic text-gray-600
                            pointer-events-none"
                            style={{ top: `${((index + 1) * 100) / (outputs.length + 1)}%` }}
                        >
                            {output.id}
                        </div>
                    )}

                </div>
            ))}
        </motion.div>
    );
};

export default memo(BaseNode);