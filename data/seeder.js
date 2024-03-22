require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Customer = require("../models/customerModel");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("connection ke dtatabase sukses");
  });

const customers = JSON.parse(fs.readFileSync("./data/customers.json", "utf-8"));

//Buat function buat impor dan clear
const importData = async () => {
  try {
    await Customer.create(customers);
    console.log("Data sukses di Import");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const clearData = async () => {
  try {
    await Customer.deleteMany();
    console.log("Data sukses di clear");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv);
if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  clearData();
}
