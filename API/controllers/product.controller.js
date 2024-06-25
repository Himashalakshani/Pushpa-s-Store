import Product from "../models/product.model.js";

export const addProduct = async (req, res, next) => {
  try {
    const { name, brand, price, discountedPrice, quantity, imageUrl } =
      req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      brand,
      price,
      discountedPrice,
      quantity,
      imageUrl, // Assign the image buffer
    });

    // Save the new product to the database
    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    next(error);
  }
};
export const getProducts = async (req, res, next) => {
  try {
    // Check if the user is authenticated
    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // Fetch all products from the database
    const products = await Product.find();

    // Check if any products were found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Convert image buffers to base64 strings
    const productsWithBase64Images = products.map((product) => {
      return {
        ...product.toJSON(),
      };
    });

    // If products were found, return them with base64-encoded images
    res.status(200).json({ products: productsWithBase64Images });
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId; // Assuming productId is passed as a parameter
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: `Product not found ${productId}` });
    }
    res
      .status(200)
      .json({ message: `Product deleted successfully ${productId}` });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, brand, price, discountedPrice, quantity, imageUrl } = req.body;
  console.log(req.body);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        brand,
        price,
        discountedPrice,
        quantity,
        imageUrl,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: `Product not found ${productId}` });
    }

    res.status(200).json({
      message: `Product updated successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};
