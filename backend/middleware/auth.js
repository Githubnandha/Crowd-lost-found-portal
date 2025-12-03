const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (request, response, next) => {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return response.status(401).json({ message: "Access denied" });
    const user = jwt.verify(token, SECRET_KEY);
    request.user = user;
    next();
  } catch (error) {
    return response.status(403).json({ message: "invalid token" });
  }
};
module.exports = { authenticateToken };
