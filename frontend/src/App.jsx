import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Supplier from "./supplier";
import AddSupplier from "./form";
import UpdateSupplier from "./update-supplier";
import NavBar from "./navbar"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={[<NavBar/>,<Supplier />]} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/update-supplier/:id" element={<UpdateSupplier />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
