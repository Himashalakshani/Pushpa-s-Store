import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const suppliers = [
  {
    _id: 1,
    supplierName: "Acme Corp",
    product: "Widgets",
    contactNumber: "(555) 555-1212",
    email: "info@acmecorp.com",
    type: "Manufacturer",
    onTheWay: false,
  },
  {
    _id: 2,
    supplierName: "Gadget Guru",
    product: "Electronic Gadgets",
    contactNumber: "(555) 555-2323",
    email: "sales@gadgetguru.com",
    type: "Retailer",
    onTheWay: true,
  },
  {
    _id: 3,
    supplierName: "Wonder Supplies",
    product: "Office Supplies",
    contactNumber: "(555) 555-3434",
    email: "contact@wondersupplies.com",
    type: "Wholesaler",
    onTheWay: false,
  },
];

const Supplier = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:8070/supplier/get")
        .then((res) => res.json())
        .then((json) => {
          setData(json);
        });
    })();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/supplier/delete/${id}`);
      alert("Successfully Delete the supplier");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <NavBar />
      <h1 className="text-5xl my-5">SUPPLIERS</h1>
      <div className="button-container">
        <Link to="/add-supplier">
          <duv className="btn">ADD SUPPLIER</duv>
        </Link>
      </div>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Product</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Type</th>
            <th>On the Way</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.supplierName}</td>
              <td>{supplier.product}</td>
              <td>{supplier.contactNumber}</td>
              <td>{supplier.email}</td>
              <td>{supplier.type}</td>
              <td>{supplier.onTheWay}</td>
              <td>
                <a
                  href=" "
                  className="btn"
                  onClick={() => deleteHandler(supplier._id)}
                >
                  Delete
                </a>

                <a href={`/update-supplier/${supplier._id}`} className="btn">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Supplier;
