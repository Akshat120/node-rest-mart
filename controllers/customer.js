exports.dashboard = function (req, res) {
  res.status(200).json({
    msg: "Welcome to customer-dashboard",
  });
};

exports.help = function (req, res) {
  res.status(200).json({
    msg: "customer-help",
  });
};

exports.login = function (req, res) {
  res.status(200).json({
    msg: "customer-login",
  });
};

exports.signup = function (req, res) {
  res.status(200).json({
    msg: "customer-signup",
  });
};
