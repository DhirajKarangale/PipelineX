# 🚀 PipelineX — Visual AI Pipeline Builder

PipelineX is a **full‑stack visual pipeline builder** that lets you drag, drop, and connect functional nodes to create AI and automation workflows.  
Built using **React Flow**, powered by a **FastAPI backend**, and structured for real-world extensibility.

---

# 🎥 Live Preview

### ⚡ Demo GIF — Build a Pipeline Visually
![PipelineX Demo](preview/PipelineX.gif)

### 🌟 PipelineX Screenshot
![PipelineX Screenshot](preview/PipelineX.png)

---

# ✨ Features

### 🎛 Visual Pipeline Editor  
- Drag‑and‑drop nodes  
- Connect inputs → processors → outputs  
- Smart responsive toolbar  
- Shared abstraction across all node types  

### 🔍 Backend Validation (FastAPI)  
- Counts nodes  
- Counts edges  
- Validates if the graph is a DAG (no circular pipelines)

### 🧩 Rich Node Library  
- Input  
- Text Processor  
- File Upload  
- LLM  
- Decision  
- Merge  
- Output  
- Result

### 🎨 UI Enhancements  
- Clean, unified styling  
- Dynamic text resizing  
- Variable handle support using `{{variable}}`  

---

# ⚙️ Tech Stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | React, React Flow, Zustand |
| Backend   | FastAPI, Python, Uvicorn |
| Cache     | Redis (Docker) |
| Dev Tools | Node.js, npm |

---

# 📂 Project Structure

```
PipelineX/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── nodes/
│   │   ├── store.js
│   │   ├── toolbar.js
│   │   ├── submit.js
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone Repository
```bash
git clone https://github.com/DhirajKarangale/PipelineX.git
cd PipelineX
```

---

## 2️⃣ Backend Setup (FastAPI)
```bash
cd backend
### Windows
```
python -m venv venv
```

### macOS/Linux
```
python3 -m venv venv
```
## 4️⃣ Activate Environment

### Windows
```
venv\Scripts\activate
```

### macOS/Linux
```
source venv/bin/activate
```

pip install -r requirements.txt

pip install fastapi uvicorn
uvicorn main:app --reload
```

Backend: **http://localhost:8000**

---

## 3️⃣ Frontend Setup (React)
```bash
cd frontend
npm install
npm run start
```

Frontend: **http://localhost:3000**

---

# 🛠 Usage

1. Open the app (port 3000).  
2. Drag nodes from the toolbar onto the canvas.  
3. Connect nodes visually.  
4. Configure each node using the built‑in form.  
5. Click **Submit** to validate pipeline structure.  
6. FastAPI returns:  
   - Node count  
   - Edge count  
   - DAG validity  

---