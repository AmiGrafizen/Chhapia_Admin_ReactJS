import React, { useEffect } from "react";
import "../src/App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../src/pages/LoginPage/Login"
import Dashboard from "./pages/dashboard/Dashboard";
import CreateUser from "./pages/createUser/CreateUser";
import Landing from "./pages/landingPage/Landing";
import ProductPage from "./pages/Product/ProductPage";


function App() {


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
   {/* <Route
          path="/dashboard"
          element={<Dashboard />}
        /> */}

<Route
          path="/contact-us"
          element={<CreateUser />}
        />


<Route
          path="/landing-page"
          element={<Landing />}
        />


<Route
          path="/create-product"
          element={<ProductPage />}
        />
      </Routes>
    </>
  );
}

export default App;
