const mongoose = require("mongoose");
const Product = require("../models/product");

exports.create_product = function (req, res) {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    sellprice: req.body.sellprice,
    costprice: req.body.costprice,
    stocks: req.body.stocks,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        msg: "Product Created.",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_all = function (req, res) {
  Product.find()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        products: docs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_by_id = function (req, res) {
  Product.findById(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          msg: "Product Not Found",
        });
      } else {
        res.status(200).json({
          product: result,
          request: {
            type: "GET",
            url: "http://localhost:3000/products",
          },
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
