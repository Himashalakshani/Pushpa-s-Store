import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/storage"; // Import specific Firebase services if you need them

const firebaseConfig = {
  apiKey: "AIzaSyBl3Nf7HJoBFhq-vgtxXCD5D_h6Ow9VnkQ",
  authDomain: "exmplepject.firebaseapp.com",
  projectId: "exmplepject",
  storageBucket: "exmplepject.appspot.com",
  messagingSenderId: "315274215064",
  appId: "1:315274215064:web:5e92acac0a9c121de69aed",
  measurementId: "G-D5CYVVDHGJ",
};

firebase.initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
