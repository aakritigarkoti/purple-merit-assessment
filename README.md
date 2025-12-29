# 🛡️ User Management System (Purple Merit Assessment)

> A secure, full-stack MERN application featuring Role-Based Access Control (RBAC), JWT Authentication, and a modern Dark Mode UI.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

---

## 🚀 Project Overview

This project is a **Full Stack User Management System** built as an assessment for **Purple Merit**. It solves the problem of secure user administration by providing distinct portals for **Admins** and **Standard Users**.

### ✨ Key Features
* **🔐 Secure Authentication:** Login and Signup with encrypted passwords (BCrypt).
* **🛡️ Role-Based Access Control (RBAC):**
    * **Admin:** Access to a protected Dashboard to view, activate, or deactivate users.
    * **User:** Access to a private Profile page to manage personal info.
* **🌑 Modern UI:** Custom-built "Dark Mode" interface with glass-morphism effects.
* **📡 Smart Navigation:** Protected routes that automatically redirect unauthorized access.

---

## 🛠️ Tech Stack Used

### **Frontend**
* **React.js:** Component-based UI architecture.
* **Vite:** High-speed build tool and development server.
* **React Router DOM:** For seamless client-side navigation.
* **Axios:** For handling API requests (GET, POST, PATCH, PUT).
* **CSS3:** Custom responsive styling with Flexbox and CSS Variables.

### **Backend**
* **Node.js & Express:** Scalable server-side runtime.
* **MongoDB & Mongoose:** NoSQL database for flexible data storage.
* **JWT (JSON Web Tokens):** Secure, stateless authentication mechanism.
* **Bcrypt.js:** Industry-standard password hashing.
* **Cors:** Middleware to enable secure cross-origin resource sharing.
* **Dotenv:** For secure environment variable management.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### **1. Clone the Repository**
```bash
git clone [https://github.com/YOUR_USERNAME/purple-merit-assessment.git](https://github.com/YOUR_USERNAME/purple-merit-assessment.git)
cd purple-merit-assessment
2. Backend Setup
Navigate to the backend folder and install dependencies:

Bash

cd backend
npm install
Create a .env file in the backend folder and add your credentials:

Code snippet

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Start the server:

Bash

npm run dev
3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:

Bash

cd ../frontend
npm install
Start the React app:

Bash

npm run dev


👨‍💻 Author
[Aakriti Garkoti]

Assessment for: Purple Merit

Role: Backend Intern / Full Stack Developer
