import { Link } from "react-router-dom";
import UserNav from "../components/UserNav";
import bgImage from "../assets/View.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

function Cart() {
  const [products, setProducts] = useState([]);
  const [grandTotalPrice, setGrandTotalPrice] = useState(0);

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
          setProducts(res.data?.products);
        })
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let total = 0;
    products?.map((product) => {
      total += product.totalPrice * product.quantity;
    });
    setGrandTotalPrice(total);
  }, [products]);

  const handleDelete = (id, productName) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${productName} from the cart?`
      )
    ) {
      axios
        .delete(`http://localhost:3000/api/cart/delete/${id}`)
        .then((res) => {
          alert("Item Removed from Cart Successfully");
          getProducts(); // Update the products after deletion
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    axios
      .put(`http://localhost:3000/api/cart/update/${productId}`, {
        userId: localStorage.getItem("userid"),
        quantity: newQuantity,
      })
      .then((res) => {
        // Update the products after updating quantity
        getProducts();
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleDeleteAll = () => {
    if (
      window.confirm("Are you sure you want to delete all items from the cart?")
    ) {
      let userId = localStorage.getItem("userid");
      axios
        .delete(`http://localhost:3000/api/cart/deleteall/${userId}`)
        .then((res) => {
          alert("All Items Removed from Cart Successfully");
          getProducts(); // Update the products after deletion
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to Checkout");
  };

  return (
    <div
      className="h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <UserNav />
      <section className="shopping-cart p-8 bg-opacity-50">
        <div className="text-white">
          <div className="bg-black text-white text-center rounded-lg">
            <h1 className="text-4xl font-semibold uppercase mb-2">
              Shopping Cart
            </h1>
          </div>
        </div>
        <br></br>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-4 px-6 text-l">Image</th>
                <th className="py-4 px-6 text-l">Name</th>
                <th className="py-4 px-6 text-l">Price</th>
                <th className="py-4 px-6 text-l">Quantity</th>
                <th className="py-4 px-6 text-l">Total Price</th>
                <th className="py-4 px-6 text-l">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b border-gray-200"
                >
                  <td className="py-4 px-6 text-xl text-center">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="h-24 object-cover"
                    />
                  </td>
                  <td className="py-4 px-6 text-l text-center">
                    {product.productName}
                  </td>
                  <td className="py-4 px-6 text-l text-center">
                    Rs.{product.ItemPrice}/-
                  </td>
                  <td className="py-4 px-6 text-l text-center">
                    <input
                      type="number"
                      value={product.quantity}
                      className="w-16 h-10 text-center border border-gray-300 rounded-md"
                      name="quantity"
                      onChange={(e) => {
                        const newQuantity = e.target.value;
                        updateQuantity(product._id, newQuantity); // Update quantity
                      }}
                    />
                  </td>
                  <td className="py-4 px-6 text-l text-center">
                    Rs.{product.totalPrice * product.quantity}/-
                  </td>
                  <td className="py-4 px-6 text-l text-center">
                    <div className="flex items-center justify-center">
                      <div
                        className="delete-btn-all bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md cursor-pointer text-l flex items-center"
                        onClick={() =>
                          handleDelete(product._id, product.productName)
                        }
                      >
                        <i className="fas fa-trash"></i> Delete
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-white border-b border-gray-200">
                <td className="py-4 px-6 text-2xl text-center">
                  <Link
                    to="/"
                    className="option-btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-l"
                  >
                    Continue Shopping
                  </Link>
                </td>
                <td className="py-4 px-6 text-xl text-center" colSpan="1"></td>
                <td className="py-4 px-6 text-2xl text-center font-semibold text-blue-800">
                  Grand Total:
                </td>
                <td className="py-4 px-6 text-xl text-center" colSpan="1"></td>
                <td className="py-4 px-6 text-2xl text-center font-semibold text-blue-800">
                  Rs.{grandTotalPrice}/-
                </td>
                <td className="py-4 px-6 text-xl text-center">
                  <div
                    className="delete-btn-item bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md cursor-pointer"
                    onClick={handleDeleteAll}
                  >
                    <i className="fas fa-trash mr-2"></i> Delete All
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/Checkout"
            className="btn checkout bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md text-xl"
          >
            Proceed to Checkout
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Cart;
