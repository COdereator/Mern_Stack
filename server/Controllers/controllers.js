const { User } = require("../Models/models");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.send("nothing World");
  } catch (error) {
    console.log(error);
  }
};

// nothing
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hashPassword,
    });

    console.log(userCreated);
    res.status(200).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "user not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "password is incorrect",
      });
    }
    res.status(200).json({
      msg: "login successful",
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error from Login" });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(req.user);
    // res.send("hello guys");
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

module.exports = {
  home,
  login,
  register,
  user,
};
