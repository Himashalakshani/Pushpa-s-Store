import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import bgImg from "../assets/View.jpg";
import UserNav from "../components/UserNav";
import searchIcon from "@iconify-icons/mdi/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const ProductViewer = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/products/get-products"
        );
        if (response.status === 200) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("An error occurred while fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    let userId = localStorage.getItem("userid");
    try {
      // Check if user is authenticated

      if (userId == null) {
        navigate("user-login");
        return;
      }
      const isAuthenticated = true; // Replace with your authentication logic
      if (!isAuthenticated) {
        navigate("/signin"); // Redirect to sign-in page if not authenticated
        return;
      }
      const payload = {
        userId: userId,
        productId: product?.productId,
        productName: product?.productName,
        imageUrl: product?.imageUrl,
        quantity: product?.quantity,
        ItemPrice: product?.ItemPrice,
        totalPrice: product?.totalPrice,
      };
      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        payload
      );
      console.log(payload);
      if (response.status === 200) {
        alert("Item added to cart successfully");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        minHeight: "100vh",
      }}
    >
      <UserNav />
      <div className="container mx-auto py-8 main-cont">
        <div className="flex justify-center mb-4 searchbar">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-4 py-2 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-green-500 p-2 ml-3 rounded-xl searchbtn">
            <Icon icon={searchIcon} className="text-white text-2xl" />
          </button>
        </div>
        <div className="flex gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white w-fit h-fit rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              {console.log(product.imageUrl)}
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-32 w-32 object-cover mb-2 rounded-md"
              />
              <h3 className="text-lg font-semibold product-details name">
                {product.name}
              </h3>
              <p className="text-gray-600 product-details price">
                Rs.{product.price}
              </p>
              <div className="flex items-center justify-center mt-4 text-black hover:text-white">
                <button
                  onClick={() =>
                    handleAddToCart({
                      productId: product._id,
                      productName: product.name,
                      imageUrl: product.imageUrl,
                      quantity: 1,
                      ItemPrice: product.price,
                      totalPrice: product.price,
                    })
                  }
                  className="flex items-center text-black hover:bg-green-700 border w-full hover:outline-none font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out hover:text-white product-details addcart"
                >
                  <Icon
                    icon="mdi-light:cart"
                    className="mr-2 text-black hover:text-white"
                  />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductViewer;
