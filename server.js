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



app.listen(PORT, () => {
  console.log(`APP running on port : ${PORT}`);
});
