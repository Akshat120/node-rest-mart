function authUser(req, res, next) {
  if (req.user) {
    res.status(200).json({ msg: "User Logged in" });
    // next();
  } else {
    res.status(401).json({
      msg: "Unauthoized",
    });
  }
}

module.exports = authUser;
