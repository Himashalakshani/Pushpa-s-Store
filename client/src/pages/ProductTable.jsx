import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import bgImg from "../assets/bgImgTBLE.png";
import Sidebar from "../components/SideBar";
import { Link, useNavigate } from "react-router-dom";

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Simulate fetching products from an API
    const fetchProducts = async () => {
      // You can replace this with your actual API endpoint
      const response = await fetch(
        "http://localhost:3000/api/products/get-products"
      );
      const data = await response.json();
      setProducts(data.products);
      console.log(data.products);
    };

    if (localStorage.getItem("AdminId") === null) {
      alert("Please login to continue");
      navigate("/admin-login");
    }

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    // Send a DELETE request to the backend to delete the product
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/delete-product/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the deleted product from the products array
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleCloseSidebar = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <div className="container mx-auto py-8">
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl font-semibold text-green-600 mb-4">
              Product List
            </h2>
            <Link to="/add">
              <button className=" rounded-xl p-2 pl-2 pr-2 bg-white text-green-600 border border-green-600 h-fit hover:bg-green-50">
                {" "}
                <span className="font-extrabold">+</span> Add Products
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Product Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Price (Rs.)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Discounted Price (Rs.)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-green-50 cursor-pointer"
                    // onClick={() => handleProductClick(product)}
                  >
                    <td className="w-32">
                      <img
                        src={product.imageUrl}
                        alt={product.imageUrl}
                        className="w-32"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.discountedPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-green-600 border-2 rounded-xl p-3 mr-3 hover:text-white hover:bg-green-500"
                        onClick={() => handleProductClick(product)}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-600 border-2 p-3 rounded-xl"
                        onClick={(e) => {
                          e.stopPropagation(); // This prevents the click event from propagating to the table row
                          handleDelete(product._id);
                          console.log(product._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedProduct && (
            <div className="fixed top-0 right-0 bottom-0 w-64 bg-green-200 p-4">
              <Sidebar product={selectedProduct} onClose={handleCloseSidebar} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
