const Supplier = require("../models/supplier.js");

exports.createSuppler = async (req, res) => {
  const { supplierName, product, contactNumber, email, type, onTheWay } =
    req.body;

  const newSupplier = new Supplier({
    supplierName,
    product,
    contactNumber,
    email,
    type,
    onTheWay,
  });

  await newSupplier
    .save()
    .then(() => res.json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.getSupplier = async (req, res) => {
  await Supplier.find()
    .then((sup) => res.json(sup))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.getSupplierID = async (req, res) => {
  const { id } = req.params;

  await Supplier.findById(id)
    .then((sup) => res.json(sup))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;

  await Supplier.findByIdAndDelete(id)
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
};

exports.updateSupplier = async (req, res) => {
  const { id } = req.params;

  const { supplierName, product, contactNumber, email, type, onTheWay } =
    req.body;

  await Supplier.findByIdAndUpdate(id, {
    supplierName,
    product,
    contactNumber,
    email,
    type,
    onTheWay,
  })
    .then(() => res.json({ message: "Update Successfully" }))
    .catch((error) => res.json({ success: false, error: error }));
};
