// draggableNode.jsx
import { memo } from "react";
import { motion } from "framer-motion";

export const DraggableNode = memo(({ type, label, icon: Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <motion.div
      draggable
      onDragStart={(e) => onDragStart(e, type)}
      className="
        cursor-grab active:cursor-grabbing
        select-none
        w-[88px] h-[88px]
        rounded-md
        bg-gray-100
        border border-gray-400
        flex flex-col items-center justify-center gap-1
        text-gray-700
        shadow-[0_2px_6px_rgba(0,0,0,0.08)]
        hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]
        transition-shadow duration-150
      "
      /* Framer Motion */
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon size={18} className="text-gray-600" />}

      <span className="text-xs font-medium text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
});
