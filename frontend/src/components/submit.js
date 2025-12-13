import { useState, useEffect, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { motion } from "framer-motion";
import { useStore } from "../store/store";
import { ModalNotification } from "./modalNotification";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const apiUrl = `${baseUrl}/pipelines/parse`;

  const { nodes, edges } = useStore(selector, shallow);

  const [submitted, setSubmitted] = useState(false);
  const [currData, setCurrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (loading) return; // ✅ prevent double submit

    const payload = { nodes, edges };

    try {
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCurrData(data);
      setSubmitted(true);
    } catch (err) {
      console.error("Error posting pipeline:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, nodes, edges, apiUrl]);

  /* ⌨️ Ctrl / Cmd + Enter submit */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        handleClick();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClick]);

  return (
    <div className="flex items-center justify-center">
      {submitted && (
        <ModalNotification
          close={() => setSubmitted(false)}
          data={currData}
        />
      )}

      <motion.button
        type="button"
        onClick={handleClick}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        className="
          px-6 py-2
          rounded-full
          bg-sky-500
          text-white font-semibold text-sm
          shadow-[0_4px_14px_rgba(56,189,248,0.6)]
          hover:bg-sky-600
          hover:shadow-[0_6px_18px_rgba(56,189,248,0.75)]
          transition-all duration-150
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {loading ? "Submitting..." : "Submit"}
      </motion.button>
    </div>
  );
};
