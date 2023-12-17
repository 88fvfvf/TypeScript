import React from "react";
import { Route, Routes } from "react-router-dom";
import Favourites from "./pages/Favourites";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";


function App() {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </>
  )
}

export default App;
