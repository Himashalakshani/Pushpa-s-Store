import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProducts from "./pages/AddProducts";
import ProductTable from "./pages/ProductTable";
import ProductViewer from "./pages/ProductViewer";
import Cart from "./pages/cart";
import Checkout from "./pages/Checkout";

import AddUserDetailsForm from "./pages/UpdateUserDetailsForm";
import UpdateUserDetails from "./pages/DEPUpdateDetails";
import ViewUserDetails from "./pages/ViewUserDetails";
import LoginPage from "./pages/UserLogin";
import UserRegistration from "./pages/UserRegistration";

import AddDeliveryAgentForm from "./pages/AddDeliveryAgentForm ";
import ManageAgents from "./pages/ManageAgents";
import UpdateDeliveryAgent from "./pages/UpdateDetails";
import ViewUser from "./pages/ViewUser";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Supplier from "./pages/supplier";
import AddSupplierForm from "./pages/form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add-user-details" element={<AddUserDetailsForm />} />
        <Route path="/update-details" element={<UpdateUserDetails />} />
        <Route path="/view-details" element={<ViewUserDetails />} />
        <Route path="/user-login" element={<LoginPage />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-View/" element={<ViewUser />} />

        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/table" element={<ProductTable />} />
        <Route path="/" element={<ProductViewer />} />
        <Route path="/add" element={<AddProducts />} />

        <Route path="/add-agents" element={<AddDeliveryAgentForm />} />
        <Route path="/agents" element={<ManageAgents />} />
        <Route path="/update-agents/:id" element={<UpdateDeliveryAgent />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminRegister />} />

        <Route path="/supplier" element={<Supplier />} />
        <Route path="/add-supplier" element={<AddSupplierForm />} />
        <Route path="/update-supplier/:id" element={<AddSupplierForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
