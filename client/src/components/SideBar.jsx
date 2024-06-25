import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const Sidebar = ({ product, onClose }) => {
  if (onClose === null) {
    return null;
  }

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    brand: product.brand,
    quantity: product.quantity,
    price: product.price,
    discountedPrice: product.discountedPrice,
  });

  // Log whenever the product prop changes
  useEffect(() => {
    console.log("Product prop updated:", product);
    setFormData({
      name: product.name,
      brand: product.brand,
      quantity: product.quantity,
      price: product.price,
      discountedPrice: product.discountedPrice,
    });
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      setLoading(true);
      try {
        const snapshot = await fileRef.put(selectedFile);
        const url = await snapshot.ref.getDownloadURL();
        setFormData({ ...formData, imageUrl: url });
        console.log("File uploaded successfully:", url);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated product data to the server
      const response = await fetch(
        `http://localhost:3000/api/products/update-product/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Product updated successfully");
        alert("Product updated successfully");
        window.location.reload();
      } else {
        console.log("Failed to update product");
      }
    } catch (error) {
      console.log("Error occurred while updating product:", error);
      // Handle error case
    }
  };

  return (
    <div className="bg-green-200">
      <div className="h-full p-4">
        <h2 className="text-lg font-semibold mb-4">Product Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm p-3 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Brand
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm p-3 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm p-3 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (Rs.)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm p-3 border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="discountedPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Discounted Price (Rs.)
            </label>
            <input
              type="number"
              name="discountedPrice"
              id="discountedPrice"
              value={formData.discountedPrice}
              onChange={handleChange}
              className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm p-3 border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border mr-4 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
          <div className="flex justify-between items-center mb-4"></div>
        </form>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
