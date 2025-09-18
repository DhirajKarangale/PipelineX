import { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, { Background } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import InputNode from "./nodes/inputNode";
import OutputNode from "./nodes/outputNode";
import { LLMNode } from "./nodes/llmNode";
import { TextNode } from "./nodes/textNode";
import { FileUploadNode } from "./nodes/fileUploadNode";
import { ProcessingNode } from "./nodes/processingNode";
import { DecisionNode } from "./nodes/decisionNode";
import { MergeNode } from "./nodes/mergeNode";
import { ResultNode } from "./nodes/resultNode";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  customOutput: OutputNode,
  llm: LLMNode,
  text: TextNode,
  fileUpload: FileUploadNode,
  end: FileUploadNode,
  processing: ProcessingNode,
  decision: DecisionNode,
  merge: MergeNode,
  result: ResultNode,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } =
    useStore((state) => ({
      nodes: state.nodes,
      edges: state.edges,
      getNodeID: state.getNodeID,
      addNode: state.addNode,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      selectedNode: state.selectedNode,
      removeNode: state.removeNode,
      setSelectedNode: state.setSelectedNode,
    }), shallow);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete") {
        const { selectedNode, edges, removeNode, setEdges } = useStore.getState();

        if (selectedNode) {
          removeNode(selectedNode);
        } else {
          const remainingEdges = edges.filter((edge) => !edge.selected);
          setEdges(remainingEdges);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, addNode, getNodeID]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ height: "86vh", border: "1px solid #dee2e6", borderRadius: "8px", overflow: "hidden" }}
      onClick={() => useStore.getState().setSelectedNode(null)}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        style={{ height: "100%" }}
      >
        <Background />
      </ReactFlow>
    </div>

  );
};