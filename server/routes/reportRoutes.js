const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Report, Vital } = require('../models/index');
const { authenticateToken } = require('../middleware/auth');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// UPLOAD REPORT & VITALS
router.post('/upload', authenticateToken, upload.single('reportFile'), async (req, res) => {
    try {
        const { reportType, date, vitals } = req.body; // vitals should be a JSON string
        
        // 1. Save Report Metadata
        const report = await Report.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            reportType,
            date,
            UserId: req.user.id
        });

        // 2. Save Vitals (if provided)
        if (vitals) {
            const parsedVitals = JSON.parse(vitals); // e.g., [{type: 'Sugar', value: 110}]
            const vitalsData = parsedVitals.map(v => ({
                ...v,
                ReportId: report.id,
                UserId: req.user.id
            }));
            await Vital.bulkCreate(vitalsData);
        }

        res.status(201).json({ message: "Report and Vitals uploaded!", report });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
});

// GET ALL REPORTS FOR LOGGED IN USER
router.get('/my-reports', authenticateToken, async (req, res) => {
    const reports = await Report.findAll({ where: { UserId: req.user.id }, include: [Vital] });
    res.json(reports);
});

module.exports = router;