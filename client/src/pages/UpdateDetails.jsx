import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { FiTrash2 } from "react-icons/fi";
import PropTypes from "prop-types";
import bgImg from "../assets/bgImgDelivery.jpg";
import { useParams, useNavigate } from "react-router-dom";
const UpdateDeliveryAgent = ({ agentId }) => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("AdminId") === null) {
      alert("Please login to continue");
      navigate("/admin-login");
    }
    const fetchByID = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/agent/get/${id}`,
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
          setAgent(data);
        } else {
          console.error("Failed to fetch agent:", response);
        }
      } catch (error) {
        console.error("An error occurred while fetching agent:", error);
      }
    };

    fetchByID();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgent((prevAgent) => ({
      ...prevAgent,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/agent/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agent),
        }
      );

      if (response.ok) {
        console.log("Agent updated successfully");
        navigate("/agents");
      } else {
        console.error("Failed to update agent:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while updating agent:", error);
    }
  };

  if (!agent) {
    return <div>Loading...</div>;
  }

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
        <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-800">
            Update Delivery Agent
          </h2>
          <div className="mb-4">
            <img src={agent.imgURL} alt="" className="w-36 mx-auto h-36" />
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={agent.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Age:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={agent.age}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={agent.phoneNumber}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              value={agent.userName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={agent.email}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              onClick={(e) => {
                navigate("/agents");
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateDeliveryAgent.propTypes = {
  agentId: PropTypes.string.isRequired,
};

export default UpdateDeliveryAgent;
