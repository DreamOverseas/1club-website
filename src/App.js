// Utils Imports
import React from "react";
import { Route, Routes } from "react-router-dom";

// Style Imports
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Pages/Components Imports
import Footer from "./Components/Footer";
import Navigation from "./Components/Navigation";
import Home from "./Views/Home";
import GuestInfo from "./Views/GuestInfo";
import Location from "./Views/Location";
import Events from "./Views/Events";
import Wildlife from "./Views/Wildlife";

function App() {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/wildlife' element={<Wildlife />} />
        <Route path='/events' element={<Events />} />
        <Route path='/location' element={<Location />} />
        <Route path='/guest-information' element={<GuestInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
