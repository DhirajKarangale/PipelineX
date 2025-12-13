// Toolbar.jsx
import { motion } from "framer-motion";
import { DraggableNode } from "./draggableNode";
import { SubmitButton } from "./submit";
import { NODE_ITEMS } from "./toolbarConfig";

export const Toolbar = () => {
  return (
    <motion.div
      /* Framer Motion */
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        w-full px-3 py-2
        bg-white
        shadow-[0_0_40px_rgba(0,0,0,0.1)]
        flex flex-wrap items-center justify-between
        gap-y-2
      "
    >
      {/* Node palette */}
      <div className="flex flex-wrap gap-2 flex-1">
        {NODE_ITEMS.map(({ type, label, icon }) => (
          <DraggableNode
            key={type}
            type={type}
            label={label}
            icon={icon}
          />
        ))}
      </div>

      {/* Divider + Submit */}
      <div className="flex-shrink-0 pl-3 border-l border-gray-300">
        <SubmitButton />
      </div>
    </motion.div>
  );
};
