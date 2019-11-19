const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.SECRET || "testing test", (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: true, message: err.message, data: err });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else
    res.status(400).json({ error: true, message: "No credentials passed" });
};
