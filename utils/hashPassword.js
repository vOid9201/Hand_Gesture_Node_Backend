const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async plainText => {
  const hashedText = await bcrypt.hash(plainText, saltRounds);
  return hashedText;
};

module.exports = hashPassword;