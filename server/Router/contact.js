const express = require("express");
const contact = express.Router();
const { contactForm } = require("../Controllers/contact");

contact.route("/").post(contactForm);

module.exports = {
  contact,
};
