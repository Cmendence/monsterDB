import "./App.css";
// import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import monsters from "../newMonsterDB.json";
import MonsterList from "./Components/MonsterList";
import FilterPanel from "./Components/FilterPanel";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  //query is the controlled search input
  const [query, setQuery] = useState("");
  // results per page and current page used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  // search bar updates on every keystroke. handleSearch sets the current page to 1 when you hit search
  const handleSearch = () => {
    setCurrentPage(1);
  };

  // used to set the new page of pagination and scroll to top
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setQuery("");
    setCurrentPage(1);
  };

  // all monsters first sent through the search if query is truthy
  const monsterSearch = monsters.filter((monster) => {
    const monsterName = monster["Name"].toLowerCase();
    return monsterName.includes(query.toLowerCase());
  });

  // calculate the total number of pages based on the returned results and current value of resultsPerPage
  const totalPages = Math.ceil(monsterSearch.length / resultsPerPage);

  // calculate the index of the first and last result to display on the current page
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
                setResultsPerPage={setResultsPerPage}
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
                setResultsPerPage={setResultsPerPage}
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
