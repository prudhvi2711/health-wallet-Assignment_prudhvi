const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http'); // Native HTTP module
const { sequelize } = require('./models/index');

const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Server is officially PERMANENTLY ACTIVE</h1>");
});

// CREATE THE SERVER WRAPPER
const server = http.createServer(app);

async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log("✅ Database Synced Successfully");

        // Use the server wrapper to listen
        server.listen(PORT, () => {
            console.log(`\n🚀 >>> SERVER IS NOW LISTENING ON PORT ${PORT} <<< 🚀`);
            console.log(`📡 TEST LINK: http://localhost:${PORT}`);
            console.log(`⚠️  DO NOT CLOSE THIS WINDOW. IF YOU SEE THE '%' SIGN, IT FAILED.\n`);
        });

        // Error handling for the server process
        server.on('error', (e) => {
            console.error("❌ SERVER ERROR:", e);
        });

    } catch (error) {
        console.error("❌ STARTUP ERROR:", error);
    }
}

startServer();