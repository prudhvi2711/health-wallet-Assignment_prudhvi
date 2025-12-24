import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token); // Store the "Key"
            alert("Login Successful!");
            navigate('/dashboard'); // Go to the health wallet
        } catch (err) {
            alert("Login Failed: " + err.response.data.error);
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h2>Health Wallet Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br/><br/>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required /><br/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;