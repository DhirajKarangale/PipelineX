# 🌐 FlowLink

FlowLink is a **full-stack integrations platform prototype** that connects third-party applications using **OAuth 2.0**.  
It includes integrations for **Airtable**, **Notion**, and **HubSpot**, and provides a modular foundation for adding new integrations.  

Built with a **FastAPI backend**, **React frontend**, and **Redis** for token/session management.  

---

## ✨ Features
- 🔑 Secure **OAuth 2.0 authentication** for Airtable, Notion, and HubSpot  
- ⚡ **FastAPI backend** with modular and extensible integration structure  
- 🖥️ **React frontend** with a clean and simple UI  
- 🗄️ **Redis-based storage** for sessions and tokens  
- ➕ Easily extendable to support additional integrations and APIs  

---

## 🛠 Tech Stack
- **Frontend**: React, JavaScript  
- **Backend**: Python, FastAPI  
- **Cache/DB**: Redis (via Docker)  
- **Other Tools**:  
  - Uvicorn (ASGI server)  
  - Node.js + npm  
  - Docker  

---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository
```bash
git clone https://github.com/your-username/flowlink.git
cd flowlink
```

### 🔹 2. Run Redis (via Docker)
Make sure Docker is installed, then start Redis:
```bash
docker run --name redis -d -p 6379:6379 redis
docker start redis
```

### 🔹 3. Backend Setup
```bash
# Navigate to backend folder
cd backend

# (First time only) Create and activate a virtual environment
python -m venv .venv
.venv\Scripts\activate    # Windows
source .venv/bin/activate # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```

The backend will be available at: **http://localhost:8000**

### 🔹 4. Frontend Setup
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
│   ├── integrations/      # Airtable, Notion, HubSpot integrations
│   ├── main.py            # FastAPI entrypoint
│   └── requirements.txt   # Backend dependencies
├── frontend/              # React frontend
│   ├── src/integrations/  # Frontend integration logic
│   └── package.json       # Frontend dependencies
└── README.md              # Project documentation
```

---

## 🚀 Usage
1. Start Redis with Docker  
2. Run the backend server (FastAPI + Uvicorn)  
3. Run the frontend (React)  
4. Open the app at **http://localhost:3000**  
5. Authenticate with **Airtable**, **Notion**, or **HubSpot** 🎉  

---

## 📌 Notes
- 🔐 You’ll need to set up your own **OAuth client IDs and secrets** for each integration.  
- 🛠 Airtable and Notion integrations are included as **examples** (credentials redacted).  
- ⚡ The modular design allows **quick addition of new integrations**.  

---

## 🖤 About
FlowLink was built as part of a **technical assessment project** to demonstrate skills in:  
- Full-stack development  
- OAuth 2.0 integrations  
- API connectivity and session management  
- Modular, extensible system design  

---
