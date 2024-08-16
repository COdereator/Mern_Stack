const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name atleast of minimum 3 char" })
    .max(100, { message: "Name mus not be more than 100 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Email is not valid" })
    .max(100, { message: "Name mus not be more than 100 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be atleast 10" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" })
    .max(100, { message: "Password must not be more than 100 characters" }),
});

module.exports = {
  signupSchema,
};
