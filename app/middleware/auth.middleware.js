const jwt = require("jsonwebtoken");
const config = require("../config/config");
const db = require("../../models");
const Users = db.Users;


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, config.secretKey);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: "Token expired" });
      } else {
        return res.status(401).json({ error: "Invalid token" });
      }
    }

    const user = await Users.findOne({ where: { email: decodedToken.email } });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authMiddleware;
