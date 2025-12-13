import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const ModalNotification = ({ close, data }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("modal-open");

    const handleEsc = (e) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handleEsc);
    closeBtnRef.current?.focus();

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleEsc);
    };
  }, [close]);

  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          onClick={close}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="
            relative z-10
            w-[320px] sm:w-[400px]
            bg-white
            rounded-xl
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            p-6
            text-center
          "
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={closeBtnRef}
            onClick={close}
            className="
              absolute top-3 right-3
              text-gray-400 hover:text-gray-700
              transition
              focus:outline-none focus:ring-2 focus:ring-sky-400 rounded
            "
          >
            <X size={20} />
          </button>

          <div className="text-5xl mb-3">🥳</div>

          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Submission Successful!
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Your graph has been submitted successfully
          </p>

          <div className="border-t border-gray-200 my-4" />

          <div className="text-sm text-gray-700 space-y-1">
            <div>
              <span className="font-medium">Number of Nodes:</span>{" "}
              {data.num_nodes}
            </div>
            <div>
              <span className="font-medium">Number of Edges:</span>{" "}
              {data.num_edges}
            </div>

            <div
              className={`font-semibold mt-2 ${data.is_dag ? "text-green-600" : "text-red-600"
                }`}
            >
              {data.is_dag
                ? "Graph is a Directed Acyclic Graph (DAG)"
                : "Graph is NOT a Directed Acyclic Graph (DAG)"}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={close}
            className="
              mt-5
              px-6 py-2
              rounded-full
              bg-sky-500 text-white font-semibold text-sm
              shadow-[0_4px_14px_rgba(56,189,248,0.6)]
              hover:bg-sky-600
              transition-all
            "
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};