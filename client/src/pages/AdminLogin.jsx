import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {
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
        "http://localhost:3000/api/admin/signIn",
        formData
      );
      if (res.status === 200) {
        // Admin signed in successfully
        alert("Admin signed in successfully");
        navigate("/table");
        const adminId = res.data.adminId;
        console.log("Admin ID:", adminId);
        localStorage.setItem("AdminId", adminId);
        // localStorage.setItem("AdminId", res.data.admin._id);
        // Redirect to admin dashboard or any other desired page
        // Example: window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      console.error("Login failed:", error);
      console.log(formData);
      // Handle login error here, such as displaying an error message to the user
    }
  };

  return (
    <div className="w-fit mx-auto mt-32 border-2 p-5 rounded-3xl">
      <h1 className="text-center font-semibold text-3xl">Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className="block mb-2">
          Username
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
          Login
        </button>
        <Link to="/admin-signup">
          <button>New here?</button>
        </Link>
      </form>
    </div>
  );
}

export default AdminLogin;
