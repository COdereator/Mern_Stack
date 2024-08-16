const jwt = require("jsonwebtoken");
const { User } = require("../Models/models");

const getMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(400).json({ msg: "Error" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log(`Token from the server ${jwtToken}`);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.secret);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(400).json({ msg: "Error from the jwtToken" });
  }
};

module.exports = {
  getMiddleware,
};
