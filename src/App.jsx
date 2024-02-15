import "./App.css";
// import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import monsters from "../newMonsterDB.json";
import MonsterList from "./Components/MonsterList";
import FilterPanel from "./Components/FilterPanel";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
   setCurrentPage(1); 
 }, []);

  const handleSearch = () => {
    setCurrentPage(1);
    console.log(query);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
   setQuery('')
   setCurrentPage(1)
  }
  const monsterSearch = monsters.filter((monster) => {
    const monsterName = monster["Name"].toLowerCase();
    return monsterName.includes(query.toLowerCase());
  });

  // Calculate the total number of pages
  const totalPages = Math.ceil(monsterSearch.length / resultsPerPage);

  // Calculate the index of the first and last result to display on the current page
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = Math.min(startIndex + resultsPerPage, monsterSearch.length);



  return (
    <div className="bg-teal-100 font-sans text-gray-800 min-h-screen">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/allMonsters"
            element={
              <MonsterList
                monsterSearch={monsterSearch}
                monsters={monsters}
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handlePageChange={handlePageChange}
                resultsPerPage={resultsPerPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                clearSearch={clearSearch}
              />
            }
          />
          <Route
            path="/filter"
            element={
              <FilterPanel
                monsterSearch={monsterSearch}
                monsters={monsters}
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handlePageChange={handlePageChange}
                resultsPerPage={resultsPerPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                clearSearch={clearSearch}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
