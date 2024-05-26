import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    phone_number: {
      type: String,
      trim: true,
      validate(phone) {
        var validRegex =
          /^[\+]?[0-9]{0,3}\W?+[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!phone.value.match(validRegex))
          throw new Error("Invalid Phone Number. Try Again.");
      },
    },
    email: {
      type: String,
      trim: true,
      validate(email) {
        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.value.match(validRegex))
          throw new Error("Invalid Email Address. Try Again.");
      },
    },
    address: {
      type: String,
    },
    birthday: {
      type: String,
      trim: true,
    },
    pronouns: {
      type: String,
    },
    socials: {
      type: [String],
    },
    notes: {
      type: String,
    },
    tags: {
      type: [Number],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "contact_list" },
);

const Contact = mongoose.model("Contact", ContactSchema);

export default Contact;
