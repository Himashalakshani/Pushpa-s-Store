// import { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";
// import { FiTrash2 } from "react-icons/fi";
// import PropTypes from "prop-types";
// import bgImg from "../assets/bgImgDelivery.jpg";

// const UpdateUserDetails = ({ UserId }) => {
//   const [user, setAgent] = useState(null);

//   useEffect(() => {
//     const dummyData = {
//       id: UserId,
//       name: "John Doe",
//       age: 30,
//       phoneNumber: "123-456-7890",
//       username: "john.doe",
//       password: "password123",
//     };
//     setAgent(dummyData);
//   }, [UserId]);

//   const handleUpdate = () => {
//     console.log("Update User Details:", user);
//   };

//   const handleDelete = () => {
//     console.log("Delete User Details:", user.id);
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bgImg})`,
//         backgroundSize: "cover",
//         minHeight: "100vh",
//       }}
//     >
//       <div className="w-screen">
//         <NavBar />
//         <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
//           <h2 className="text-2xl font-bold mb-4 text-green-800">
//             Update User Details
//           </h2>
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={user.name}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="phoneNumber"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Phone Number:
//             </label>
//             <input
//               type="tel"
//               id="phoneNumber"
//               value={user.phoneNumber}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block text-gray-700 text-sm font-bold mb-2"
//             >
//               Username:
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={user.username}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               readOnly
//             />
//           </div>
//           <div className="flex justify-between items-center">
//             <button
//               onClick={handleUpdate}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Update
//             </button>
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
//             >
//               <FiTrash2 className="mr-2" /> Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// UpdateUserDetails.propTypes = {
//   userId: PropTypes.string.isRequired,
// };

// export default UpdateUserDetails;


import React from 'react'

function DEPUpdateDetails() {
  return (
    <div>DEPUpdateDetails</div>
  )
}

export default DEPUpdateDetails