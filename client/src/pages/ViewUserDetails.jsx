import { useState, useEffect } from "react";
import agentImage from "../assets/agentImg.png";
import NavBar from "../components/NavBar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import bgImg from "../assets/bgImg.jpg";

const ViewUserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/getUsers"); // Fetch users from backend
        if (response.ok) {
          const data = await response.json(); // Parse response JSON
          setUsers(data); // Update users state with fetched data
        } else {
          console.error("Failed to fetch users:", response);
        }
      } catch (error) {
        console.error("An error occurred while fetching users:", error);
      }
    };

    fetchUsers(); // Call fetchUsers function when component mounts
  }, []);

  const handleUpdate = (id) => {
    console.log("Update User Details with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove the deleted user from the local state
        setUsers(users.filter((user) => user._id !== id));
        console.log("User deleted successfully");
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error);
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
      <div className="w-screen">
        <NavBar />
        <div className="ml-8 mr-8 mx-auto flex flex-col">
          <h2 className="text-4xl font-bold mb-4 justify text-center text-green-800">
            Users
          </h2>
          <div className="flex flex-wrap ">
            {users.map((user) => (
              <div
                key={user._id} // Use MongoDB _id as the key
                className="bg-white rounded-md p-4 w-86 shadow-md hover:shadow-lg mx-4 my-4 flex flex-col items-center"
              >
                <img
                  src={agentImage}
                  alt="User"
                  className="w-fit h-40 object-cover rounded-md mb-4 "
                />
                <p className="font-bold">{user.username}</p>
                <p className="text-wrap">Email: {user.email}</p>
                {/* <p>Username: {user.username}</p> */}
                <div className="flex mt-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                  >
                    <FiTrash2 className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserDetails;
