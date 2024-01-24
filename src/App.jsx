
import './App.css'
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import monsters from "../ALL_MONSTERS.json"
import MonsterList from "./Components/MonsterList"
import FilterPanel from './Components/FilterPanel'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Footer from './Components/Footer';


function App() {

  return (
     <div className='bg-teal-100 font-sans text-gray-800 min-h-screen'>
       <Router>
      <NavBar />
      <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/allMonsters" element={<MonsterList monsters={monsters} />}></Route>
      </Routes>
      <Footer />
      </Router>
    </div>
  )
}

export default App
