const express = require("express");
const {
  getAllUser,
  getAllContact,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
} = require("../Controllers/admin");

const { getMiddleware } = require("../Middlewares/auth");
const { adminMiddleware } = require("../Middlewares/admin");
const admin = express.Router();

admin.route("/").get(getMiddleware, adminMiddleware, getAllUser);

admin.route("/contact").get(getMiddleware, adminMiddleware, getAllContact);

admin.route("/:id").get(getMiddleware, adminMiddleware, getUserById);

admin
  .route("/contactdelete/:id")
  .delete(getMiddleware, adminMiddleware, deleteContactById);

admin
  .route("/delete/:id")
  .delete(getMiddleware, adminMiddleware, deleteUserById);

admin.route("/edit/:id").patch(getMiddleware, adminMiddleware, updateUserById);

module.exports = {
  admin,
};
