import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { ModalNotification } from "./modalNotification";
import { useState } from "react";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const base_url = process.env.REACT_APP_API_URL;;
  const api_url = `${base_url}/pipelines/parse`;

  const { nodes, edges } = useStore(selector, shallow);
  const [submitted, setSubmitted] = useState(false);
  const [currData, setCurrData] = useState({});

  const handleClick = async () => {
    const data = { nodes: nodes, edges: edges };

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      setCurrData(responseData);
      setSubmitted(true);
    } catch (error) {
      console.error("Error psoting data:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {submitted && (
        <ModalNotification close={() => setSubmitted(false)} data={currData} />
      )}
      <button
        type="submit"
        onClick={handleClick}
        style={{
          margin: "0px",
          background: "#5bc0de",
          color: "white",
          width: "100px",
          padding: "10px",
          borderRadius: "20px",
          fontWeight: 600,
          fontSize: "1rem",
          boxShadow: "1px 1px 12px 0px #5bc0de",
          cursor: "pointer",
          border: "none",
        }}
      >
        Submit
      </button>
    </div>
  );
};
