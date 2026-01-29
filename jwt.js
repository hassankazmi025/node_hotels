const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Invalid Token" });

  //extract the jwt token from the request header

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.send(401).json({ error: "Unauthorized" });

  try {
    //verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //attached user information to the request object

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate JWT token

const generateToken = (userData) => {
  // Generate new JWT token using user data
  return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: 30000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
