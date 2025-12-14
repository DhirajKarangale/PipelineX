import { memo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/store";
import { ModalNotification } from "./modalNotification";

const SubmitButton = () => {
  const baseUrl = process.env.REACT_APP_API_URL;
  const apiUrl = `${baseUrl}/pipelines/parse`;

  const { nodes, edges } = useStore();

  const [submitted, setSubmitted] = useState(false);
  const [currData, setCurrData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (loading) return;

    if (!nodes || nodes.length === 0) {
      setError("Add some nodes to your pipeline before submitting");
      setSubmitted(true);
      return;
    }

    console.log("Nodes: ", nodes);
    console.log("Edges: ", edges);

    const payload = { nodes, edges };

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();

        const match = text.match(/<pre>(.*?)<\/pre>/s);
        const errorMsg = match ? match[1] : `Request failed (${response.status})`;

        throw new Error(errorMsg);
      }

      const data = await response.json();

      setCurrData(data);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }, [loading, nodes, edges, apiUrl]);


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
          close={() => {
            setSubmitted(false);
            setError(null);
            setCurrData(null);
          }}
          data={currData}
          error={error}
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

export default memo(SubmitButton);