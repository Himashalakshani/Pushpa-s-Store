const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Supplier = new Schema({
  supplierName: {
    type: String,
  },

  product: {
    type: String,
  },

  contactNumber: {
    type: Number,
  },

  email: {
    type: String,
  },

  type: {
    type: String,
  },

  onTheWay: {
    type: String,
  },
});

const newSupplier = mongoose.model("supplier", Supplier);

module.exports = newSupplier;
