const { User } = require("../Models/models");
const { Contact } = require("../Models/contact");

const getAllUser = async (req, res) => {
  try {
    const user = await User.find({}, { password: 0 });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
    // console.log(user);
  } catch (error) {
    res.status(400).json({ msg: "Error" });
  }
};

const getAllContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    if (!contact || contact.length === 0) {
      return res.status(404).json({ message: "No contact found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ msg: "Error aa raha hai" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: "Error Hello" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;
    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updateUserData,
      }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ msg: "Error" });
    console.log("Error" + error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.deleteOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
  }
};

const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await Contact.deleteOne({ _id: id });
    if (!contact) {
      return res.status(404).json({ message: "No contact found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ msg: "Error" });
  }
};

module.exports = {
  getAllUser,
  getAllContact,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};
