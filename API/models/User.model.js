import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    nic: {
      unique: false,
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
