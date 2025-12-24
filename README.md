🩺 Digital Health Wallet
A full-stack web application designed to help users securely store medical reports (PDFs/Images) and track their health vitals (Blood Sugar) over time with dynamic visual trends.

🚀 Overview
The Digital Health Wallet allows users to manage their medical history in one place. By uploading medical documents and entering associated vitals, users can visualize their health progress through an interactive trend graph.

🛠 Tech Stack
Frontend: React.js, Recharts (for data visualization), Axios (API calls).

Backend: Node.js, Express.js, Multer (file handling).

Database: SQLite with Sequelize ORM for secure data management.

Authentication: JWT (JSON Web Tokens) and Bcrypt hashing for secure user access.

✨ Key Features
Secure Authentication: User registration and login functionality.

Medical Report Management: Upload and view PDF or image-based reports.

Vitals Tracking: Automated tracking of blood sugar levels tied to specific reports.

Dynamic Health Trends: Interactive line charts displaying vitals over time.

Access Control: Simulated sharing feature to grant report access to family or doctors.

📥 Installation & Setup
To run this project on your local machine, follow these steps:

1. Prerequisites

Node.js (v16.x or higher)

npm

Git

2. Clone the Repository

3. Backend Setup (Server)

Navigate to the server directory:

Install dependencies:

Start the server:

Port: Runs on 5001 (configured to avoid macOS AirPlay conflicts).

Database: SQLite will automatically generate database.sqlite on first run.

4. Frontend Setup (Client)

Open a new terminal tab and navigate to the client directory:

Install dependencies:

Start the React application:

The app will open automatically at http://localhost:3000.

⚠️ Important: Port 5001 for Mac Users
If you encounter an EADDRINUSE: address already in use :::5001 error on a Mac:

Go to System Settings > General > AirPlay & Handoff.

Turn OFF "AirPlay Receiver".

Restart your Node.js server.
