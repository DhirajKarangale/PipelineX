import { memo, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/store";
import { XCircle } from "lucide-react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

const BaseNode = ({
    id,
    icon: Icon,
    additionalStyle,
    title,
    children,
    inputs = [],
    outputs = [],
}) => {
    const { selectedNodes, setSelectedNode, removeNode } = useStore((state) => ({
        removeNode: state.removeNode,
        selectedNodes: state.selectedNodes,
        setSelectedNode: state.setSelectedNode,
    }));

    const isSelected = selectedNodes.has(id);
    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
        updateNodeInternals(id);
    }, [id, inputs.length, outputs.length, updateNodeInternals]);

    const handleRemove = (e) => {
        e.stopPropagation();
        removeNode(id);
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(id, e.ctrlKey || e.metaKey);
            }}
            className="relative w-[200px] min-h-[100px] overflow-visible"
        >
            {inputs.map((input, index) => (
                <Handle
                    key={`in-${index}`}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${input.id}`}
                    className="handle"
                    style={{
                        top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
                    }}
                />
            ))}

            {outputs.map((output, index) => (
                <Handle
                    key={`out-${index}`}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${output.id}`}
                    className="handle"
                    style={{
                        top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    boxShadow: isSelected
                        ? "0 0 0 1px rgba(59,130,246,0.7)"
                        : "0 2px 6px rgba(0,0,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
                onAnimationComplete={() => updateNodeInternals(id)}
                className={`${additionalStyle} bg-gray-100 p-2
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
            </motion.div>
        </div>
    );
};

export default memo(BaseNode);
