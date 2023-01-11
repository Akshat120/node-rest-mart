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
  res.status(200).json({
    msg: "Admin Login",
  });
};
