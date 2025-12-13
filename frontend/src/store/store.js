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
  selectedNodes: new Set(),

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
      const updatedEdges = applyEdgeChanges(changes, state.edges).map((edge) => ({
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

      const anyEdgeSelected = updatedEdges.some((e) => e.selected);

      return {
        edges: updatedEdges,

        nodes: anyEdgeSelected
          ? state.nodes.map((n) => ({ ...n, selected: false }))
          : state.nodes,

        selectedNodes: anyEdgeSelected ? new Set() : state.selectedNodes,
      };
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

  clearSelection: () =>
    set((state) => ({
      selectedNodes: new Set(),
      edges: state.edges.map((e) => ({
        ...e,
        selected: false,
        style: { ...e.style, stroke: "#888" },
        markerEnd: { ...e.markerEnd, color: "#888" },
      })),
    })),

  setSelectedNode: (nodeId, multi = false) =>
    set((state) => {
      const next = new Set(state.selectedNodes);

      if (!multi) next.clear();

      if (nodeId) {
        if (next.has(nodeId)) next.delete(nodeId);
        else next.add(nodeId);
      }

      return {
        selectedNodes: next,
        nodes: state.nodes.map((n) => ({
          ...n,
          selected: next.has(n.id),
        })),
        edges: multi
          ? state.edges
          : state.edges.map((e) => ({
            ...e,
            selected: false,
            style: { ...e.style, stroke: "#888" },
            markerEnd: { ...e.markerEnd, color: "#888" },
          })),
      };
    }),
}));