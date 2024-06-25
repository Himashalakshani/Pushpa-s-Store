import { useState } from "react";
import NavBar from "../components/NavBar";
import { FiTrash2 } from "react-icons/fi";
import bgImg from "../assets/bgImg.jpg";

const AddUserDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    nicNumber: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setFormData({
      name: "",
      nicNumber: "",
      phoneNumber: "",
      username: "",
      password: "",
    });
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
          <h2 className="text-2xl text-center font-bold mb-4 text-green-800">
            Update User Details
          </h2>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <form onSubmit={handleSubmit}>
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Login Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                    required
                  />
                </div>
              </form>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
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
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="file"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              file:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="file"
              required
            />
          </div>
          <div className="w-full">
          <div className="flex justify-between items-center">
            <button
              // onClick={""}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              // onClick={""}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <FiTrash2 className="mr-2" /> Delete
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserDetailsForm;
