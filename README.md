# 🌐 FlowLink

FlowLink is a full-stack pipeline builder prototype that lets users create and connect nodes visually using React Flow.
The backend, powered by FastAPI, validates pipelines by counting nodes/edges and checking whether the graph forms a DAG (Directed Acyclic Graph).

Built with a React frontend, FastAPI backend, and Redis for token/session management.

---

## ✨ Features
- 🖥️ React Flow frontend for visual pipeline creation
- ⚡ FastAPI backend for pipeline validation
- 🔗 Custom node types (inputs, outputs, LLMs, text, etc.) with a shared abstraction
- 📦 Dynamic Text Node that resizes with input and supports variable handles ({{variable}})
- 📊 Backend validation: returns number of nodes, number of edges, and DAG check
- 🎨 Unified styling across all nodes and components

---

## 🛠 Tech Stack
- **Frontend**: React, JavaScript, React Flow, Zustand
- **Backend**: Python, FastAPI, Uvicorn  
- **Cache/DB**: Redis (via Docker)  
- **Other Tools**: Node.js, npm, Docker  

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/DhirajKarangale/FlowLink.git
cd FlowLink
```

### 🔹 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Run the backend server
uvicorn main:app --reload
```

The backend will be available at: **http://localhost:8000**

### 🔹 3. Frontend Setup
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend server
npm run start
```

The frontend will be available at: **http://localhost:3000**

---

## 📂 Project Structure
```
FlowLink/
├── backend/               # FastAPI backend
│   ├── main.py            # FastAPI entrypoint
├── frontend/              # React frontend
│   ├── src/               # React source code
│   │   ├── nodes/         # Node components
│   │   ├── store/         # Zustand global store
│   │   └── submit.js      # Submit button logic
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation

```

---

## 🚀 Usage
1. Run the backend server (FastAPI + Uvicorn)  
2. Run the frontend (React)  
3. Open the app at **http://localhost:3000**  
4. Build pipelines visually, connect nodes, and test integrations.

---