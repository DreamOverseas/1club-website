// Utils Imports
import React from "react";
import { Route, Routes } from "react-router-dom";

// Style Imports
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/Fonts.css";
import "./App.css";

// Pages/Components Imports
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import Home from "./Views/Home";
import Services from "./Views/Services";
import Membership from "./Views/Membership";
import ContactUs from "./Views/ContactUs";
import MemberCenter from "./Views/MemberCenter";
import MemberManagement from "./Views/MemberManagement";

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/member-center' element={<MemberCenter />} />
        <Route path='/member-management-page' element={<MemberManagement />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
