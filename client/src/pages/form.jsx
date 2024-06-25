import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function AddSupplierForm() {
  const navigate = useNavigate();

  const [supplierName, setSupplierName] = useState("");
  const [product, setProduct] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [onTheWay, setOnTheWay] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const onTheWayValue = onTheWay ? "Yes" : "No";

    try {
      await axios.post("http://localhost:8070/supplier/create", {
        supplierName,
        product,
        contactNumber,
        email,
        type,
        onTheWay: onTheWayValue,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4">Add Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="product" className="block mb-1">
              Product:
            </label>
            <input
              type="text"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block mb-1">
              Contact Number:
            </label>
            <input
              type="text"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block mb-1">
              Type:
            </label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">On The Way:</label>
            <div>
              <input
                type="radio"
                id="onTheWayYes"
                checked={onTheWay}
                onChange={() => setOnTheWay(true)}
                className="mr-2"
              />
              <label htmlFor="onTheWayYes" className="mr-4">
                Yes
              </label>
              <input
                type="radio"
                id="onTheWayNo"
                checked={!onTheWay}
                onChange={() => setOnTheWay(false)}
                className="mr-2"
              />
              <label htmlFor="onTheWayNo">No</label>
            </div>
          </div>
          <button type="submit" className="bg-white py-2 px-4 rounded">
            Add Supplier
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSupplierForm;
