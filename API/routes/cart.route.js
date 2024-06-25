// Import necessary modules
import express from "express";
import Cart from "../models/cart.model.js";

// Create a new router instance
const router = express.Router();

// Route for adding an item to the cart
// router.post("/add", async (req, res) => {
//   const product = new Cart(req.body);
//   try {
//     // Check if the user is authenticated (you need to implement this)
//     const isAuthenticated = true; // Replace with your authentication logic
//     if (!isAuthenticated) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const savedProduct = await product.save();
//     res.json({ message: "Item added to cart", product: savedProduct });
//   } catch (error) {
//     console.error("Error adding item to cart:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// Route for adding an item to the cart
router.post("/add", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    // Check if the user is authenticated (you need to implement this)
    const isAuthenticated = true; // Replace with your authentication logic
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the product already exists in the cart for the same user
    const existingProduct = await Cart.findOne({ productId, userId });

    if (existingProduct) {
      // If the product exists for the same user, increment the quantity by 1
      existingProduct.quantity += 1;
      await existingProduct.save();
      return res.json({
        message: "Quantity updated in cart",
        product: existingProduct,
      });
    } else {
      // If the product doesn't exist for the same user, create a new entry in the cart
      const newProduct = new Cart({ ...req.body, userId });
      const savedProduct = await newProduct.save();
      return res.json({ message: "Item added to cart", product: savedProduct });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route for getting all items in the cart for a specific user
router.get("/getcart/:userId", async (req, res) => {
  try {
    // Check if the user is authenticated and get the user ID
    const isAuthenticated = true; // Replace with your authentication logic
    const userId = req.params.userId; // Assuming you have a middleware to extract userId from request

    if (!isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const products = await Cart.find({ userId: userId });
    res.json({ total: products.length, products });
  } catch (error) {
    console.error("Error getting items from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  let productId = req.params.id;
  await Cart.findByIdAndDelete(productId)
    .then(() => {
      res.status(200).send({ status: "deleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "error in delete", err });
    });
});

//deleteall
router.route("/deleteall/:userId").delete(async (req, res) => {
  let userId = req.params.userId;
  await Cart.deleteMany({ userId: userId })
    .then(() => {
      res.status(200).send({ status: "deleted" });
    })
    .catch((err) => {
      res.status(500).send({ status: "error in delete", err });
    });
});

// Route for updating the quantity of a product in the cart
router.put("/update/:productId", async (req, res) => {
  console.log("Code came here");
  const { productId } = req.params;
  const { quantity, userId } = req.body;
  console.log("id", productId);
  console.log("userID", userId);
  console.log("quantity", quantity);

  try {
    // Check if the user is authenticated (you need to implement this)
    const isAuthenticated = true; // Replace with your authentication logic
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the product in the cart by productId and userId
    const product = await Cart.findOne({ _id: productId, userId });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found in user's cart" });
    }

    // Update the quantity of the product
    product.quantity = quantity;
    await product.save();

    return res.json({ message: "Quantity updated successfully", product });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
