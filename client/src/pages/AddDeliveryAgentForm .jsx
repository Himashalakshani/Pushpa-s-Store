import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Icon } from "@iconify/react";
import bgImg from "../assets/bgImg.jpg";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const AddDeliveryAgentForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    nic: "",
    phoneNumber: "",
    userName: "",
    email: "",
    imgURL: "",
  });

  useEffect(() => {
    if (localStorage.getItem("AdminId") === null) {
      alert("Please login to continue");
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);
      setLoading(true);
      try {
        const snapshot = await fileRef.put(selectedFile);
        const url = await snapshot.ref.getDownloadURL();
        setFormData({ ...formData, imgURL: url });
        console.log("File uploaded successfully:", formData.imgURL);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/agent/add",
        formData
      );
      console.log("Response:", response.data);
      // Reset form fields after successful submission
      setFormData({
        name: "",
        age: "",
        nic: "",
        phoneNumber: "",
        userName: "",
        email: "",
        imgURL: "",
      });
      // Show success message to user (if required)
      alert("Agent added successfully");
      navigate("/agents");
    } catch (error) {
      console.error("Error adding agent:", error.response.data);
      // Show error message to user (if required)
      alert("Failed to add agent. Please try again later.");
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
      <div className=" w-screen h-screen">
        <NavBar />
        <div className="max-w-md mx-auto mt-5 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl text-center font-bold mt-4 mb-4 text-green-800">
            Add Delivery Agent
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <div className="mb-4">
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
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 p-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name"
                    required
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
                    value={formData.age}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Age"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nic"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    NIC Number:
                  </label>
                  <input
                    type="text"
                    id="nic"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="NIC Number"
                    required
                  />
                </div>
              </div>
              <div>
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
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="userName"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Login UserName:
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="UserName"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="email"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="file"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                File:
              </label>
              <input
                type="file"
                id="imgURL"
                name="imgURL"
                onChange={handleFileUpload}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="w-full">
              <span className="flex justify-center">
                {loading ? (
                  <p className="text-center">
                    <Icon icon="line-md:loading-alt-loop" className="w-64" />
                    Uploading image
                  </p>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 flex hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    <Icon
                      icon="mingcute:user-add-2-line"
                      width="24"
                      height="24"
                      style={{ color: "white", marginRight: "0.5rem" }}
                    />
                    Add Delivery Agent
                  </button>
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryAgentForm;
