const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_sifra_kodirana");
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      firstname: decodedToken.firstname,
      lastname: decodedToken.lastname,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
