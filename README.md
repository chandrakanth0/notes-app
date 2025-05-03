# 📝 Notes App

A full-stack notes application built with **React** (frontend), **Python Flask** (backend), and **MySQL** (database). Users can register, log in, and manage personal notes securely.

---

## 📁 Project Structure

notes-app/
│
├── backend/
│ ├── routes/
│ │ ├── auth.py
│ │ └── notes.py
│ ├── .env
│ ├── app.py
│ ├── config.py
│ ├── extension.py
│ ├── models.py
│ └── requirements.txt
│
└── frontend/
└── src/
├── pages/
│ ├── login.jsx
│ └── notes.jsx
├── styles/
│ ├── login.css
│ └── notes.css
├── services/
│ └── api.js
└── App.jsx


# Step 2 : Setup The Backend 
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
source venv/bin/activate # On macOS/Linux

pip install -r requirements.txt


# change COnfig.py as your requirement
MYSQL_HOST = 'localhost'
MYSQL_USER = 'root'
MYSQL_PASSWORD = '0000'
MYSQL_DB = 'notes_app'
MYSQL_PORT = 3306
SECRET_KEY = 'your_secret_key'
SESSION_TYPE = 'filesystem'



# Run Flask App
python app.py


# Step 3 : Setup Frontend
cd ../frontend
npm install

## change base url in src/services/api.js
  baseURL: "http://localhost:5000", // Adjust if your backend runs on a different URL/port

npm run dev




# Step 4 : Setup Mysql Database
CREATE DATABASE notes_app;
USE notes_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(255)
);

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(100),
  content TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

## insert sample user details 
INSERT INTO users (username, password) VALUES ('user', 'password');





# click on the url in react run 
go to /login for login 



🚀 Features
✅ User Login

✅ Personal Notes Management

✅ Secure API Routes with Session

✅ React Frontend with Stylish UI

✅ MySQL Data Persistence




👨‍💻 Author
Chandrakanth

