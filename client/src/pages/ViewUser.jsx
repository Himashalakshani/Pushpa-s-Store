import { useEffect, useState } from "react";
import bgImg from "../assets/bgImgViewOrder.png";
import bcrypt from "bcryptjs"; // Import bcryptjs for password hashing
import { useNavigate } from "react-router-dom";

function ViewUser() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // State to handle errors
  const [newPassword, setNewPassword] = useState(""); // State to store new password
  const [id] = useState(localStorage.getItem("userid"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/user-login");
    }

    const fetchUserById = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/profile/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUser(data);
        } else {
          setError("Failed to fetch user");
          console.error("Failed to fetch user:", response);
        }
      } catch (error) {
        setError("An error occurred while fetching user");
        console.error("An error occurred while fetching user:", error);
      }
    };

    fetchUserById();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("userid");
  };

  const handleChangePassword = async () => {
    try {
      // Send the new password to the backend for updating
      const response = await fetch(
        `http://localhost:3000/api/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: user._id, password: newPassword }),
        }
      );

      if (response.ok) {
        // Password updated successfully
        console.log("Password updated successfully");
        alert("Password updated successfully");
      } else {
        setError("Failed to update password");
        console.error("Failed to update password:", response);
      }
    } catch (error) {
      setError("An error occurred while updating password");
      console.error("An error occurred while updating password:", error);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className="w-full border border-5 h-screen"
    >
      <div className="bg-gray-100 flex flex-col justify-center align-middle p-6 rounded-md shadow-md max-w-md m-auto mt-48  border border-1">
        <h1 className="text-2xl font-semibold mb-4">Hello, {user.username}</h1>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <>
            <div>
              <label className="block text-gray-700 font-semibold">
                Username:
              </label>
              <p className="text-gray-900">{user.username}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold">
                Email:
              </label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Change Password?
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                onClick={handleChangePassword}
                className="bg-green-500 p-3 rounded-lg mt-3 hover:bg-green-700 hover:text-green-50 transition-colors"
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("userid");
                  navigate("/user-login");
                }}
                className="bg-red-500 p-3 rounded-lg ml-3    mt-3 hover:bg-red-700 hover:text-green-50 transition-colors"
              >
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewUser;
