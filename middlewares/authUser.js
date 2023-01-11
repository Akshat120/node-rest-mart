const jwt = require("jsonwebtoken");
require("dotenv").config();

function authUser(req, res, next) {
  console.log(req.headers.authorization);
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        if (decoded) {
          req.user = decoded;
          next();
        } else {
          res.status(401).json({
            msg: "Unauthoized token invalid",
          });
        }
      }
    });
  } else {
    res.status(401).json({
      msg: "Unauthoized token not provided",
    });
  }
}

module.exports = authUser;
