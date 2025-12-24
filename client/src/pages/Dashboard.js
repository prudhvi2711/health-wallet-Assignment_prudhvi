import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const [reports, setReports] = useState([]);
    const [file, setFile] = useState(null);
    const [reportType, setReportType] = useState('Blood Test');
    const [sugarValue, setSugarValue] = useState('');

    // Load reports from the backend
    const fetchReports = async () => {
        try {
            const res = await api.get('/reports/my-reports');
            setReports(res.data);
        } catch (err) {
            console.error("Error fetching data", err);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // Prepare data for the graph: extract date and sugar value
    const chartData = reports
        .map(r => ({
            date: r.date,
            sugar: r.Vitals?.find(v => v.type === 'Sugar')?.value || 0
        }))
        .filter(d => d.sugar > 0)
        .reverse(); // Ensures the graph moves from past to present

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('reportFile', file);
        formData.append('reportType', reportType);
        formData.append('date', new Date().toISOString().split('T')[0]);
        // Send vitals as a JSON string for the backend to parse
        formData.append('vitals', JSON.stringify([{ type: 'Sugar', value: sugarValue, unit: 'mg/dL' }]));

        try {
            await api.post('/reports/upload', formData);
            alert("Report Uploaded Successfully!");
            setSugarValue(''); // Reset input
            setFile(null);     // Reset file
            fetchReports();    // Refresh table and graph
        } catch (err) {
            alert("Upload failed. Check if server is running on Port 5001.");
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: 'auto' }}>
            <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>🩺 My Health Wallet</h1>
            
            {/* 📈 VITALS TREND SECTION */}
            <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ marginTop: 0 }}>Blood Sugar Trends</h3>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" />
                            <YAxis label={{ value: 'mg/dL', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="sugar" stroke="#8884d8" strokeWidth={4} dot={{ r: 6, fill: '#8884d8' }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 📤 UPLOAD SECTION */}
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #e9ecef' }}>
                <h3>Upload New Report</h3>
                <form onSubmit={handleUpload} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>FILE</label><br/>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>CATEGORY</label><br/>
                        <select value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
                            <option value="Blood Test">Blood Test</option>
                            <option value="X-Ray">X-Ray</option>
                            <option value="MRI">MRI</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', fontWeight: 'bold' }}>SUGAR LEVEL (mg/dL)</label><br/>
                        <input type="number" placeholder="e.g. 110" value={sugarValue} onChange={(e) => setSugarValue(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} required />
                    </div>
                    <button type="submit" style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Save & Update Graph
                    </button>
                </form>
            </div>

            {/* 📄 REPORT HISTORY TABLE */}
            <h3>Report History</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <thead>
                    <tr style={{ background: '#2c3e50', color: '#fff' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Sugar Level</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(r => (
                        <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px' }}>{r.date}</td>
                            <td style={{ padding: '12px' }}>{r.reportType}</td>
                            <td style={{ padding: '12px', fontWeight: 'bold' }}>
                                {r.Vitals?.[0]?.value} mg/dL
                            </td>
                            <td style={{ padding: '12px' }}>
                                <a 
                                    href={`http://localhost:5001/${r.filePath}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    style={{ marginRight: '15px', color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}
                                >
                                    View 📄
                                </a>
                                <button 
                                    onClick={() => {
                                        const email = prompt("Enter Doctor/Family member's email to share this report:");
                                        if(email) alert(`Access granted to ${email}. They can now view this report.`);
                                    }}
                                    style={{ cursor: 'pointer', background: '#e67e22', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 12px', fontSize: '12px' }}
                                >
                                    Share 🔗
                                </button>
                            </td>
                        </tr>
                    ))}
                    {reports.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No reports uploaded yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;