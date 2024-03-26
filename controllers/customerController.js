const fs = require("fs");
const Customer = require("./../models/customerModel"); //memanggil model
const { query } = require("express");

const getCustomers = async (req, res, next) => {
  try {
    //1. basic filter
    const queryObject = { ...req.query };
    const excludeColumn = ["page", "sort", "limit", "fields"];
    excludeColumn.forEach((el) => delete queryObject[el]);
    // const customers = await Customer.find(req.query);
    //console.log(req.query, queryObject);

    //2. advance filter
    //{age: {$}gte: 5}}
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //=>$gt, $gte, $lte;
    queryStr = JSON.parse(queryStr);
    console.log(queryStr);

    let query = Customer.find(queryStr);

    //3. Sorting
    //Sorting ascending = name , kalau descending = -name ex: localhost:8000/api/v1/customers?age[gt]=20&sort=-age
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join("");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //4. limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join("");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //5. Pagination
    //request query dibawah ini
    const page = req.query.page * 1 || 1;
    const limit = req.query.page * 1 || 2;
    const skip = (page - 1) * limit;
    //page 3&limit=2==> data ke 5 dan 6
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      let numCustomers = await Customer.countDocuments();
      if (skip > numCustomers) throw new Error("Page does not exist!");
    }

    //Eksekusi Query
    const customers = await query;

    res.status(200).json({
      status: "success",
      totalData: customers.length,
      requestAt: req.requestTime,
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customers = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      status: "success",
      message: "berhasil update data",
      data: {
        customers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      message: "berhasil delete data",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//menjadikan sebuah async function tambhakan async didepan
const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body); //untuk membuat data customer

    res.status(201).json({
      status: "success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
