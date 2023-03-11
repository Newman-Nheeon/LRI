import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Register, ForgotPassword } from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
