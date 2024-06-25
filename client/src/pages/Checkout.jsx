import { useEffect, useState } from "react";
import bgImg from "../assets/View.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [handlers, setHandlers] = useState([]);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState(""); // Change to an empty string
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    address: "",
    city: "",
    method: "cash on delivery",
    userId: localStorage.getItem("userid"),
    handler: "",
  });

  useEffect(() => {
    getHandlers();
    getProducts();
  }, []);

  function getProducts() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userid");
    if (token == null) {
      alert("You are not an Authorized User. Please sign in first.");
      window.location.replace("/user-login");
    } else {
      axios
        .get(`http://localhost:3000/api/cart/getcart/${userId}`)
        .then((res) => {
          setProducts(res.data.products);
          if (res.data.products.length === 0) {
            alert("No items in the cart. Please add items to the cart first.");
            navigate("/cart");
          }
          console.log(res.data.products);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
  }

  function getHandlers() {
    axios
      .get("http://localhost:3000/api/agent/get")
      .then((res) => {
        const handlerNames = res.data.map((handler) => handler.email);
        setHandlers(handlerNames);
        console.log(handlerNames);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }

  const handleDeleteAll = () => {
    let userId = localStorage.getItem("userid");
    axios
      .delete(`http://localhost:3000/api/cart/deleteall/${userId}`)
      .then((res) => {
        getProducts(); // Update the products after deletion
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const randomIndex = Math.floor(Math.random() * handlers.length);
      const randomHandlerName = handlers[randomIndex];
      const updatedFormData = {
        ...formData,
        handler: randomHandlerName,
      };

      const res = await axios.post(
        "http://localhost:3000/api/orders/add-order",
        {
          ...updatedFormData,
          products,
        }
      );
      alert("Order Placed Successfully!");

      await getProducts();

      let emailContent = `
        <h1 style="text-align: center; color: #333;">Assigned Products</h1>
        <p style="margin-top: 20px; line-height: 1.6; color: #555;">
          Dear Agent,
        </p>
        <p style="margin-top: 20px; line-height: 1.6; color: #555;">
          You have been assigned the new Orders. Please check the products and deliver them to the customer.
        </p>
        <p style="margin-top: 20px; line-height: 1.6; color: #555;">
          If you have any questions or need further assistance, feel free to reach out to us.
        </p>
        <p style="margin-top: 20px; line-height: 1.6; color: #555;">
          Thank you.
        </p>
      `;

      await axios.post("http://localhost:3000/api/sendEmail", {
        userEmail: randomHandlerName,
        subject: "Your new Order",
        html: emailContent,
      });
      console.log("Email sent successfully to agent");

      let emailCustomerContent = `
        <h1 style="text-align: center; color: #333;">Order Confirmation for ${formData.name}</h1>
        <p style="margin-top: 20px; line-height: 1.6; color: #555;">
          Dear ${formData.name},
        </p>
        <p style="margin-top: 20px; line-height: 1.6; color: #555;">
          Your order has been placed successfully. Your products will be delivered soon.
        </p>
        <p style="margin-top: 20px; line-height: 1.6; color: #555;">
          Thank you for shopping with us.
        </p>
      `;

      await axios.post("http://localhost:3000/api/sendEmail", {
        userEmail: email,
        subject: "Your Placed Order",
        html: emailCustomerContent,
      });
      console.log("Email sent successfully to customer");

      handleDeleteAll();

      setFormData({
        name: "",
        number: "",
        address: "",
        city: "",
        method: "cash on delivery",
        userId: localStorage.getItem("userid"),
        handler: "",
      });
      setEmail(""); // Reset email after form submission
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-white p-8 rounded-lg">
        <h3 className="text-2xl mb-6 text-center">Billing Address</h3>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <label htmlFor="fname" className="block mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fname"
              name="name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="Cnumber" className="block mb-2">
              Contact number
            </label>
            <input
              type="text"
              id="Cnumber"
              name="number"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              value={formData.number}
              onChange={handleChange}
            />
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              value={email} // Use email state here
              onChange={handleChange}
            />
            <label htmlFor="adr" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="adr"
              name="address"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="city" className="block mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              value={formData.city}
              onChange={handleChange}
            />
            <label className="block mb-2">Payment Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
            >
              <option value="cash on delivery">Cash on Delivery</option>
            </select>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-xl w-full"
            >
              Continue to checkout
            </button>
            <button
              type="button"
              className="bg-slate-500 hover:bg-slate-600 mt-5 text-white py-2 px-4 rounded-md text-xl w-full"
              onClick={() => navigate("/cart")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
