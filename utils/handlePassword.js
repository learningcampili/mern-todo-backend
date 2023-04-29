const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const comparePassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
};

module.exports = {
  hashPassword,
  comparePassword,
};
