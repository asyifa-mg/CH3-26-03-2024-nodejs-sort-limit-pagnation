const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  //schema seperti struktur dr collectionnya
  name: {
    type: String,
    required: [true, "name cannot be empty"],
  },
  age: Number,
  email: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
    default: "user-default.jpg",
  },
  password: {
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//model
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
