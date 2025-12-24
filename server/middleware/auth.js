const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key_here'; 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; 
    next();
  } catch (err) {
    res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = { authenticateToken, JWT_SECRET };