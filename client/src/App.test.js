import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* We will add Dashboard and Trends here next */}
          <Route path="/dashboard" element={<h1>User Dashboard (Coming Next)</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;