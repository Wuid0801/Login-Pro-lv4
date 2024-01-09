import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // AuthProvider 추가

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ToDoApp from "./components/ToDoApp";

const App = () => {
  return (
    <Router>
      <AuthProvider> {/* AuthProvider로 감싸주기 */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todos" element={<ToDoApp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
