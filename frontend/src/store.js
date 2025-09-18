import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  selectedNode: null,

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  setEdges: (edges) => set({ edges }),

  onEdgesChange: (changes) => {
    set((state) => {
      let updatedEdges = applyEdgeChanges(changes, state.edges);
      updatedEdges = updatedEdges.map((edge) => ({
        ...edge,
        style: {
          ...edge.style,
          stroke: edge.selected ? "#3b82f6" : "#888",
        },
        markerEnd: {
          ...edge.markerEnd,
          color: edge.selected ? "#3b82f6" : "#888",
        },
      }));

      return { edges: updatedEdges };
    });

  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },

  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
      selectedNode: get().selectedNode === nodeId ? null : get().selectedNode,
    });
  },

  setSelectedNode: (nodeId) => set({ selectedNode: nodeId }),
}));
