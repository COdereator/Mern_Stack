const adminMiddleware = (req, res, next) => {
  try {
    console.log(req.user);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(401)
        .json({ message: "You are not authorized to access this resource" });
    }
    // res.status(200).json({ msg: req.user.isAdmin });
    next();
  } catch (error) {
    res.status(400).json({ msg: "Error  from admin" });
  }
};

module.exports = {
  adminMiddleware,
};
