const { Service } = require("../Models/services");

const services = async (req, res) => {
  try {
    const response = await Service.find();
    if (!response) {
      return res.status(404).json({ message: "No services found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  services,
};
