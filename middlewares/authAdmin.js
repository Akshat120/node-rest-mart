const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const secureToken = require("../middlewares/secureToken");
require("dotenv").config();

function authUser(req, res, next) {
  if (req.cookies.token) {
    const token = secureToken.get_plaintoken(req.cookies.token);
    jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        if (decoded) {
          Admin.findById(decoded.id)
            .then((result) => {
              if (!result) {
                return res.status(401).json({
                  msg: "Unauthoized User",
                });
              }
              req.user = decoded;
              next();
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
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
