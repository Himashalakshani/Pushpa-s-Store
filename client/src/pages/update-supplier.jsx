import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateSupplierForm() {
  const navigate = useNavigate();

  const [supplierName, setSupplierName] = useState("");
  const [product, setProduct] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [onTheWay, setOnTheWay] = useState(false);

  const currentUrl = window.location.href;
  const urlParts = currentUrl.split("/");
  const id = urlParts[urlParts.length - 1];

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/supplier/get/${id}`
        );
        const data = response.data;
        setSupplierName(data.supplierName);
        setProduct(data.product);
        setContactNumber(data.contactNumber);
        setEmail(data.email);
        setType(data.type);
        setOnTheWay(data.onTheWay === "Yes" ? true : false);
      } catch (error) {
        console.log(error);
        alert("Error fetching supplier data");
      }
    })();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const onTheWayValue = onTheWay ? "Yes" : "No";

    try {
      await axios.put(`http://localhost:8070/supplier/update/${id}`, {
        supplierName,
        product,
        contactNumber,
        email,
        type,
        onTheWay: onTheWayValue,
      });
      alert("Supplier Update Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-bold mb-6">Update Supplier</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="product"
            className="block text-sm font-medium text-gray-700"
          >
            Product:
          </label>
          <input
            type="text"
            id="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type:
          </label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            On The Way:
          </label>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Supplier
        </button>
      </form>
    </div>
  );
}

export default UpdateSupplierForm;
