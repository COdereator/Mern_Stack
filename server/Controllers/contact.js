const { Contact } = require("../Models/contact");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ msg: "message send sucesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error" });
  }
};

module.exports = {
  contactForm,
};
