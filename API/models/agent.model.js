import mongoose from "mongoose";

const Agent = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
});

const newAgent = mongoose.model("Agent", Agent);

export default newAgent;
