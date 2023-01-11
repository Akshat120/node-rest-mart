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

exports.update_by_id = function (req, res) {
  updateOps = {};
  for (const element of req.body) {
    updateOps[element.propName] = element.value;
  }

  Product.updateOne({ _id: req.params.id }, { $set: updateOps })
    .then((result) => {
      if (result.matchedCount == 0) {
        res.status(404).json({
          msg: "Product Not Found",
          request: {
            type: "GET",
            url: "http://localhost:3000/products",
          },
        });
      } else {
        res.status(200).json({
          msg: "product updated",
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + req.params.id,
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

exports.delete_by_id = function (req, res) {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount == 0) {
        res.status(404).json({
          msg: "Product Not Found",
          request: {
            type: "GET",
            url: "http://localhost:3000/products",
          },
        });
      } else {
        res.status(200).json({
          msg: "product deleted",
          request: {
            type: "GET",
            url: "http://localhost:3000/products/",
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
