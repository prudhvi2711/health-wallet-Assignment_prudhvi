🩺 Digital Health Wallet
A full-stack medical records management system that allows users to securely store health reports and visualize vitals over time. This project was built to simplify the management of personal health data.

✨ Key Features
Secure Authentication: Full registration and login system using JWT and Bcrypt hashing.

Medical Report Storage: Ability to upload and store PDF or image-based medical reports.

Vitals Tracking: Specifically tracks blood sugar levels (mg/dL) associated with each report.

Health Trend Visualization: Dynamic line charts built with Recharts to show progress over time.

Report Sharing: Integrated feature to simulate granting report access to doctors or family members.

🛠 Tech Stack
Frontend: React.js, Recharts, Axios

Backend: Node.js, Express.js, Multer (for file management)

Database: SQLite with Sequelize ORM (Lightweight and portable)

Security: JSON Web Tokens (JWT) for session management

🚀 Installation and Setup
To run this project on your local machine, follow these steps:

1. Prerequisites

Ensure you have the following installed:

Node.js (v16.x or higher)

npm

Git

2. Clone the Repository

3. Backend Setup (Server)

Navigate to the server directory:

Install dependencies:

Start the server:

Port: Runs on 5001 (configured to avoid macOS AirPlay conflicts).

Database: SQLite will automatically generate database.sqlite on the first run.

4. Frontend Setup (Client)

Open a new terminal tab and navigate to the client directory:

Install dependencies:

Start the React app:

The app will open automatically at http://localhost:3000.

⚠️ Important Note for Mac Users
If you encounter a Port 5001 is already in use error:

Go to System Settings > General > AirPlay & Handoff.

Turn OFF "AirPlay Receiver".

Restart your Node.js server.

📁 Project Structure
How to update this on your GitHub:

Open your local README.md file in a text editor (like VS Code).

Delete the old text and paste the content above.

In your terminal, run:
