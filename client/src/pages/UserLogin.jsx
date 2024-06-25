import { useState } from "react";
import bgImg from "../assets/bgImgViewOrder.png";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        console.log("Login successful");
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", data.userId);
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred during login");
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
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div> // Display error message if error state is not empty
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            </div>
            <Link to="/user-registration" className="mt-2">
              <p>A new User?</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
