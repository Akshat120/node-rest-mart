require("dotenv").config();
const crypto = require("crypto");

exports.get_ciphertoken = function (url) {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    process.env.KEY,
    process.env.IV
  );
  let ciphertext = cipher.update(url, "utf-8", "hex");
  ciphertext += cipher.final("hex");
  return ciphertext;
};

exports.get_plaintoken = function (ciphertext) {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    process.env.KEY,
    process.env.IV
  );
  let plaintext = decipher.update(ciphertext, "hex", "utf-8");
  plaintext += decipher.final("utf-8");
  return plaintext;
};
