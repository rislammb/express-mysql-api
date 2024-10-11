const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.username = result.data?.username;
    next();
  });
};

module.exports = authenticate;
