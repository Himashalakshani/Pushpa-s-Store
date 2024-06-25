import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import bgImg from "../assets/bgImg.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ViewDeliveryAgents = () => {
  const [deliveryAgents, setDeliveryAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("AdminId") === null) {
      alert("Please login to continue");
      navigate("/admin-login");
    }
    const fetchDeliveryAgents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/agent/get");
        const agents = response.data;
        setDeliveryAgents(agents);
        setLoading(false);
        console.log("Delivery Agents:", agents);
      } catch (error) {
        console.error("Error fetching delivery agents:", error);
      }
    };
    fetchDeliveryAgents();
  }, []);

  const handleUpdate = (id) => {
    console.log("Update Delivery Agent with ID:", id);
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/agent/delete/${_id}`);
      setDeliveryAgents(deliveryAgents.filter((agent) => agent._id !== _id));
    } catch (error) {
      console.error("Error deleting delivery agent:", error);
      setError("Error deleting delivery agent");
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
            Delivery Agents
          </h2>
          <div className="flex flex-wrap ">
            {loading ? (
              <p>Loading...</p>
            ) : (
              deliveryAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-white rounded-md p-4 shadow-md hover:shadow-lg mx-4 my-4 flex flex-col items-center"
                >
                  <img
                    src={agent.imgURL}
                    alt="Agent"
                    className="w-32 h-32 object-cover rounded-md mb-4 "
                  />
                  <p className="font-bold">{agent.name}</p>
                  <p>Age: {agent.age}</p>
                  <p>email: {agent.email}</p>
                  <div className="flex mt-4">
                    <Link to={`/update-agents/${agent._id}`}>
                      <button
                        onClick={() => handleUpdate(agent.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline flex items-center"
                      >
                        <FiEdit className="mr-2" /> Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(agent._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="p-4">
          <Link to="/add-agents">
            <button className=" absolute bottom-0 right-0 m-10 bg-green-700 p-5 rounded-xl text-white font-semibold hover:bg-green-600">
              Add Agents
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewDeliveryAgents;
