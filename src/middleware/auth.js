const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ message: "Unautorized" });

    const decoded = jwt.verify(token, "johnkoder+ishayasolo");
    if (!decoded) return res.status(401).send({ message: "Unautorized" });

    next();
  } catch (e) {
    res.status(401).send({ message: "Unautorized" });
  }
};

module.exports = verifyToken;
