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
import Finance from "./Views/Finance";
import AboutUs from "./Views/AboutUs";
import Membership from "./Views/Membership";

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/property' element={<Home />} />
        <Route path='/finance' element={<Finance />} />
        <Route path='/events' element={<Events />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/membership' element={<Membership />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
