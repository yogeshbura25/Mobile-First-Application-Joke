import React from 'react';
import LoginPage from "./components/LoginPage"
import SignUpForm from "./components/SignupForm"
import HomePage from "./components/HomePage"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;