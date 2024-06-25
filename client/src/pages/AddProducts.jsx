import { useEffect, useState } from "react";
import bgImg from "../assets/bgImgTBLE.png";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const AddProducts = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    discountedPrice: "",
    quantity: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (localStorage.getItem("AdminId") === null) {
      alert("Please login to continue");
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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
      const response = await fetch(
        "http://localhost:3000/api/products/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("Form data:", formData);
      navigate("/table");
      if (response.ok) {
        const data = await response.json();
        alert("Product added successfully");
        console.log(data);
        setFormData({
          name: "",
          brand: "",
          price: "",
          discountedPrice: "",
          quantity: "",
          imageUrl: "",
        });
      } else {
        console.error("Failed to add product:", response);
      }
    } catch (error) {
      console.error("An error occurred while adding product:", error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-800 text-center">
            Add Products
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
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
                onChange={handleChange}
                className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
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
                onChange={handleChange}
                className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                onChange={handleChange}
                className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="discountedPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Discounted Price ($)
              </label>
              <input
                type="number"
                name="discountedPrice"
                id="discountedPrice"
                onChange={handleChange}
                className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileUpload}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {loading && <p>Uploading image...</p>}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Product
              </button>
              <Link to="/table">
                <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 ml-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Back
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
