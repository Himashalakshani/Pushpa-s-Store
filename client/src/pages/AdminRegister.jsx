import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/admin/signup",
        formData
      );
      if (res.status === 201) {
        // Admin signed up successfully
        alert("Admin signed up successfully");
        navigate("/admin-login");
        // Redirect to admin login page or any other desired page
        // Example: window.location.href = "/admin-login";
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      // Handle sign up error here, such as displaying an error message to the user
    }
  };

  return (
    <div>
      <div className="w-fit mx-auto mt-32 border-2 p-5 rounded-3xl">
        <h1 className="text-center font-semibold text-3xl">Admin SignUp</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2">
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
          >
            Sign Up
          </button>
          <Link to="/admin-login">
            <button>Already signed in?</button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
