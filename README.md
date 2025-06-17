# Code-editor
✅ README.md – React + Django Full Stack Project
markdown
Copy
Edit
# 🚀 Full Stack React + Django Project

A full-stack web application built with **React** (frontend) and **Django + Django REST Framework** (backend).

## 🌐 Live Preview

🔗 [Project Preview](https://profound-muffin-6896bc.netlify.app/)

---

## 📁 Project Structure

project-root/
│
├── backend/ # Django project
│ ├── manage.py
│ ├── backend/
│ └── api/
│
└── frontend/ # React app
├── public/
├── src/
├── .env
└── package.json

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
🐍 2. Backend Setup (Django)
✅ Create Virtual Environment & Install Dependencies
bash
Copy
Edit
cd backend
python -m venv env
source env/bin/activate  # On Windows use: env\Scripts\activate
pip install -r requirements.txt
If requirements.txt is missing, manually install:

bash
Copy
Edit
pip install django djangorestframework django-cors-headers
✅ Migrate Database & Run Server
bash
Copy
Edit
python manage.py migrate
python manage.py runserver
Backend will run at: http://localhost:8000

⚛️ 3. Frontend Setup (React)
bash
Copy
Edit
cd frontend
npm install
✅ Add Environment Variable
Create a .env file in /frontend:

env
Copy
Edit
REACT_APP_API_URL=http://localhost:8000/
✅ Start React Dev Server
bash
Copy
Edit
npm start
Frontend will run at: http://localhost:3000

📦 Features
✅ Fully decoupled frontend/backend

✅ RESTful API using Django REST Framework

✅ CORS-enabled cross-origin communication

✅ Environment-based API URL switching

✅ React Axios integration
