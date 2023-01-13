const express = require("express");
const controller = require("../controllers/customer");
const Product = require("../models/product");
const Cart = require("../models/cart");
const router = express.Router();

router.post("/product/:id", (req, res) => {
  console.log("cart/post", req.user);
  const productId = req.params.id;

  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          msg: "Product not found",
        });
      }
      if (product.stocks > 0) {
        Cart.findById(req.user.cid)
          .then((cart) => {
            if (!cart) {
              return res.status(404).json({
                msg: "No Cart Exists",
              });
            }
            product.stocks -= 1;
            product.save((err) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  error: err,
                });
              }
              cart.count += 1;
              if (cart.products.get(productId)) {
                cart.products.set(productId, cart.products.get(productId) + 1);

                cart.save(function (err) {
                  if (err) {
                    console.log("something went wrong");
                    console.log(err);
                    res.status(500).json({
                      error: err,
                    });
                  } else {
                    res.status(200).json({
                      msg: "Product quantity inc by 1 added to cart.",
                    });
                  }
                });
              } else {
                cart.products.set(productId, 1);

                cart.save(function (err) {
                  if (err) {
                    console.log("something went wrong");
                    console.log(err);
                    res.status(500).json({
                      error: err,
                    });
                  } else {
                    res.status(200).json({
                      msg: "new Product added to cart.",
                    });
                  }
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
      } else {
        res.status(200).json({
          msg: "Insufficient stocks",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/product/:id", (req, res) => {
  const productId = req.params.id;
  Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          msg: "Product not found",
        });
      }
      Cart.findById(req.user.cid)
        .then((cart) => {
          if (!cart) {
            return res.status(404).json({
              msg: "No Cart Exists",
            });
          }
          if (cart.products.get(productId) > 0) {
            product.stocks += cart.products.get(productId);
            product.save((err) => {
              if (err) {
                console.log(err);
                return res.status(500).json({
                  error: err,
                });
              }
              cart.count -= cart.products.get(productId);
              cart.products.delete(productId);
              cart.save(function (err) {
                if (err) {
                  console.log("something went wrong");
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                } else {
                  res.status(200).json({
                    msg: "Product removed from cart.",
                  });
                }
              });
            });
          } else {
            res.status(404).json({
              msg: "Product do not exist in cart",
            });
          }
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
});

router.patch("/product/:id", (req, res) => {
  console.log(req.params.id);
  res.status(201).json({
    msg: "Product patched from cart",
  });
});

router.get("/", (req, res) => {
  Cart.findById(req.user.cid)
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({
          msg: "Invalid Cart",
        });
      }
      res.status(200).json(cart);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/", (req, res) => {
  res.status(200).json({
    msg: "Cart patched.",
  });
});

// router.delete("/logout", authUser, controller.logout);

module.exports = router;
