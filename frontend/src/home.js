import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import { motion } from "framer-motion";
import { useStore } from "./store/store";
import { shallow } from "zustand/shallow";

import InputNode from "./nodes/inputNode";
import LLMNode from "./nodes/llmNode";
import OutputNode from "./nodes/outputNode";
import TextNode from "./nodes/textNode";
import NumberNode from "./nodes/numberNode";
import ConditionNode from "./nodes/conditionNode";
import DelayNode from "./nodes/delayNode";
import MergeNode from "./nodes/mergeNode";
import ApiRequestNode from "./nodes/apiRequestNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  number: NumberNode,
  condition: ConditionNode,
  delay: DelayNode,
  merge: MergeNode,
  apiRequest: ApiRequestNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  selectedNodes: state.selectedNodes,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  removeNode: state.removeNode,
  setSelectedNode: state.setSelectedNode,
  setEdges: state.setEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const Home = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    selectedNodes,
    getNodeID,
    addNode,
    removeNode,
    setSelectedNode,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  /* -------------------- Keyboard delete -------------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Delete") return;

      // if (selectedNode) {
      //   removeNode(selectedNode);
      // } else {
      //   setEdges(edges.filter((edge) => !edge.selected));
      // }

      if (selectedNodes.size > 0) {
        selectedNodes.forEach((id) => removeNode(id));
        return;
      }

      const remainingEdges = edges.filter((e) => !e.selected);
      setEdges(remainingEdges);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNodes, edges, removeNode, setEdges]);

  /* -------------------- Helpers -------------------- */
  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      const { nodeType } = JSON.parse(raw);
      if (!nodeType) return;

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(nodeType);

      addNode({
        id: nodeID,
        type: nodeType,
        position,
        data: getInitNodeData(nodeID, nodeType),
      });
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /* -------------------- Render -------------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      ref={reactFlowWrapper}
      onClick={(e) => {
        if (e.target.classList.contains("react-flow__pane")) {
          setSelectedNode(null);
        }
      }}
      className="
        w-full h-[86vh]
        rounded-lg
        border border-gray-300
        overflow-hidden
        bg-white
      "
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        className="h-full"
      >
        <Background color="#e5e7eb" gap={gridSize} />

        <Controls position="bottom-left" />

        <MiniMap
          position="bottom-left"
          className="ml-14 mb-2 rounded-md border border-gray-300"
        />
      </ReactFlow>
    </motion.div>
  );
};
