const router = require("express").Router();

const {
  createSuppler,
  getSupplier,
  getSupplierID,
  deleteSupplier,
  updateSupplier,
} = require("../controllers/supplier.js");

router.route("/create").post(createSuppler);

router.route("/get").get(getSupplier);

router.route("/get/:id").get(getSupplierID);

router.route("/delete/:id").delete(deleteSupplier);

router.route("/update/:id").put(updateSupplier);

module.exports = router;
