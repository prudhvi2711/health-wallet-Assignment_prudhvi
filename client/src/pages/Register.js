import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // This sends the name, email, and password to your Node.js server
            await api.post('/auth/register', formData);
            alert("Registration successful! Now you can login.");
            navigate('/login');
        } catch (err) {
            alert("Registration failed. Make sure your backend server is running on port 5000.");
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
            <h2>Create Health Wallet Account</h2>
            <form onSubmit={handleRegister} style={{ display: 'inline-block', textAlign: 'left' }}>
                <label>Full Name:</label><br/>
                <input type="text" placeholder="John Doe" style={{ padding: '8px', marginBottom: '15px', width: '250px' }} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} required /><br/>
                
                <label>Email:</label><br/>
                <input type="email" placeholder="email@example.com" style={{ padding: '8px', marginBottom: '15px', width: '250px' }}
                    onChange={(e) => setFormData({...formData, email: e.target.value})} required /><br/>
                
                <label>Password:</label><br/>
                <input type="password" placeholder="Min 6 characters" style={{ padding: '8px', marginBottom: '15px', width: '250px' }}
                    onChange={(e) => setFormData({...formData, password: e.target.value})} required /><br/>
                
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Sign Up
                </button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;