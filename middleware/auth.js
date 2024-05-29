const jwt = require("jsonwebtoken");

authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({ error: true, message: "no token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .send({ error: true, message: "Unauthorized access" });
    }
    req.userId = decoded.id;
  });

  next();
};

module.exports = authMiddleware;
