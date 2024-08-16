const express = require("express");
const { services } = require("../Controllers/services");

const service = express.Router();

service.route("/").get(services);

module.exports = {
  service,
};
