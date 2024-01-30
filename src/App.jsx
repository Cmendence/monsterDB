
import './App.css'
// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import monsters from "../updatedMonsters.json"
import MonsterList from "./Components/MonsterList"
import FilterPanel from './Components/FilterPanel'
import FilterResults from './Components/FilterResults'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import Footer from './Components/Footer';


function App() {

   const [selectedFilters, setSelectedFilters] = useState(new Set());

  return (
     <div className='bg-teal-100 font-sans text-gray-800 min-h-screen'>
       <Router>
      <NavBar />
      <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/allMonsters" element={<MonsterList monsters={monsters} />} />
         <Route path="/allMonsters" element={<FilterResults monsters={monsters} selectedFilters={selectedFilters} />} />
         <Route path="/filter" element={<FilterPanel monsters={monsters} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />} />
      </Routes>
      <Footer />
      </Router>
    </div>
  )
}

export default App
