const mongoose = require("mongoose");
const Customer = require("../models/customer");
const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secureToken = require("../middlewares/secureToken");

exports.signup = function (req, res) {
  Customer.findOne({
    mobile: req.body.mobile,
  })
    .then((result) => {
      if (result) {
        res.status(409).json({
          msg: "Mobile Already Registered.",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            const cart = new Cart({
              _id: mongoose.Types.ObjectId(),
            });
            const customer = new Customer({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              mobile: req.body.mobile,
              password: hash,
              cart_id: cart._id,
            });
            cart
              .save()
              .then((cart_result) => {
                customer
                  .save()
                  .then((cust_result) => {
                    const token = jwt.sign(
                      { id: cust_result._id, name: cust_result.name },
                      process.env.JWTKEY,
                      {
                        expiresIn: "1h",
                      }
                    );
                    res.cookie("token", secureToken.get_ciphertoken(token), {
                      maxAge: 400000,
                    });
                    res.status(201).json({
                      msg: "User Created",
                      request: {
                        type: "GET",
                        url: "http://localhost:3000/customer/",
                      },
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                      error: err,
                    });
                  });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.login = function (req, res) {
  Customer.findOne({
    mobile: req.body.mobile,
  })
    .then((cust_result) => {
      if (!cust_result) {
        return res.status(404).json({
          msg: "User not registered.",
        });
      }
      bcrypt.compare(req.body.password, cust_result.password).then((result) => {
        if (!result) {
          res.status(401).json({
            msg: "Auth failed",
          });
        } else {
          const token = jwt.sign(
            { id: cust_result._id, name: cust_result.name },
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
            token: token,
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

exports.delete = function (req, res) {
  Customer.findOne({
    _id: req.user.id,
  })
    .then((cust_result) => {
      Cart.deleteOne({ _id: cust_result.cart_id })
        .then((result) => {
          if (result.deletedCount == 0) {
            return res.status(404).json({
              msg: "User not exists",
            });
          }
          Customer.deleteOne({ _id: cust_result._id }).then((result) => {
            if (result.deletedCount) {
              res.status(200).json({
                msg: "User deleted.",
                request: {
                  type: "GET",
                  url: "http://localhost:3000/products",
                },
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
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.dashboard = function (req, res) {
  Customer.findById({ _id: req.user.id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          msg: "User Not Exist",
          request: {
            type: "POST",
            url: "http://localhost:3000/customer/",
            body: { name: "String", mobile: "String", password: "String" },
          },
        });
      } else {
        res.status(200).json({
          msg: "Welcome to dashboard user-" + result.name,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.help = function (req, res) {
  res.status(200).json({
    msg: "customer-help",
  });
};

exports.readcart = function (req, res) {
  res.status(200).json({
    msg: "cart fetched.",
  });
};

exports.updatecart = function (req, res) {
  res.status(200).json({
    msg: "cart updated.",
  });
};

exports.logout = function (req, res) {
  res.clearCookie("token");
  res.redirect("/products");
};
