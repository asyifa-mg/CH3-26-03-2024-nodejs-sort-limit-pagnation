const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  //schema seperti struktur dr collectionnya
  name: {
    type: String,
    required: [true, "name cannot be empty"],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  city: String,
  country: {
    type: String,
    required: true,
    default: "Indonesia",
  },
});

//model
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
