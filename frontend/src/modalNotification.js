import React from "react";
import { Modal, Box, Typography, Divider, Button } from "@mui/material";
import { IoIosClose } from "react-icons/io";

export const ModalNotification = ({ close, data }) => {
  return (
    <Modal
      open={true}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, sm: 400 },
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          outline: "none",
          textAlign: "center",
        }}
      >
        {/* Close button */}
        <IoIosClose
          onClick={close}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            fontSize: "1.8rem",
            cursor: "pointer",
            color: "#888",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
        />

        {/* Emoji / Icon */}
        <Box
          sx={{
            fontSize: { xs: "4rem", sm: "5rem" },
            mb: 2,
          }}
        >
          🥳
        </Box>

        {/* Heading */}
        <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 700 }}>
          Submission Successful!
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
          Your graph has been submitted successfully
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Graph details */}
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Number of Nodes:</strong> {data.num_nodes}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Number of Edges:</strong> {data.num_edges}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: data.is_dag ? "green" : "red",
            mb: 2,
          }}
        >
          {data.is_dag
            ? "Your Graph is Directed Acyclic Graph (DAG)"
            : "Your Graph is NOT a Directed Acyclic Graph (DAG)"}
        </Typography>

        {/* Action button */}
        <Button
          variant="contained"
          onClick={close}
          sx={{
            mt: 1,
            backgroundColor: "#2DBF80",
            "&:hover": { backgroundColor: "#27a46f" },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};