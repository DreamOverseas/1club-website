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
import Events from "./Views/Events";
import Prize from "./Views/Prize";
import AboutUs from "./Views/AboutUs";
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
        <Route path='/prize' element={<Prize />} />
        <Route path='/events' element={<Events />} />
        <Route path='/about-us' element={<AboutUs />} />
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
