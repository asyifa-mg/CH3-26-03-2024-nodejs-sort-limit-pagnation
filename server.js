//env harus panggil paling atas
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("connection ke dtatabase sukses");
    // console.log(con.connection);
  });

//CRUD
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

const Customer = mongoose.model("Customer", customerSchema);

const customerTest = new Customer({
  name: "syifa",
  email: "asyifamaharanigstn@gmail.com",
  phoneNumber: "88888888",
});

customerTest
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });

app.listen(PORT, () => {
  console.log(`APP running on port : ${PORT}`);
});
