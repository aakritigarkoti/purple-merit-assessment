const jwt = require('jsonwebtoken');

// Verify Token (Login Check)
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    // Remove "Bearer " from string if present
    const cleanToken = token.replace("Bearer ", "");
    const verified = jwt.verify(cleanToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Token" });
  }
};

// Verify Admin (Role Check)
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Access Denied: Admins Only" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };