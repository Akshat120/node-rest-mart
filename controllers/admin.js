const mongoose = require("mongoose");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secureToken = require("../middlewares/secureToken");

exports.dashboard = function (req, res) {
  res.status(200).json({
    msg: "Admin Dashboard",
  });
};

exports.signup = function (req, res) {
  res.status(200).json({
    msg: "Admin Signup",
  });
};

exports.login = function (req, res) {
  Admin.findOne({
    mobile: req.body.mobile,
  })
    .then((admin_result) => {
      if (!admin_result) {
        return res.status(404).json({
          msg: "Admin not registered.",
        });
      }
      bcrypt
        .compare(req.body.password, admin_result.password)
        .then((result) => {
          if (!result) {
            res.status(401).json({
              msg: "Auth failed",
            });
          } else {
            const token = jwt.sign(
              { id: admin_result._id, name: admin_result.name },
              process.env.JWTKEY,
              {
                expiresIn: "1h",
              }
            );

            res.cookie("token", secureToken.get_ciphertoken(token), {
              maxAge: 400000,
            });

            res.status(200).json({
              msg: "login success",
            });
          }
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
