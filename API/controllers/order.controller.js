import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";

export const addOrder = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      name,
      number,
      address,
      city,
      method,
      userId,
      handler,
      products, // Array of products in the order
    } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      name,
      number,
      address,
      city,
      method,
      userId,
      handler,
      products, // Array of products
    });

    // Reduce the quantity of each product in stock
    for (const product of products) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: { quantity: -product.quantity },
      });
    }

    // Save the order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order added successfully", order: newOrder });
  } catch (error) {
    next(error);
  }
};
