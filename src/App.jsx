import "./App.css";
// import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";
import monsters from "../newMonsterDB.json";
import MonsterList from "./Components/MonsterList";
import FilterPanel from "./Components/FilterPanel";
import NavBar from "./Components/NavBar";
import About from "./Components/About";
import Footer from "./Components/Footer";

function App() {
  //query is the controlled search input
  const [query, setQuery] = useState("");
  // results per page and current page used for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);

  // used to set the new page of pagination and scroll to top
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          
          <Route
            path="/"
            element={
              <MonsterList
                monsterSearch={monsterSearch}
                monsters={monsters}
                query={query}
                setQuery={setQuery}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handlePageChange={handlePageChange}
                resultsPerPage={resultsPerPage}
                setResultsPerPage={setResultsPerPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handlePageChange={handlePageChange}
                resultsPerPage={resultsPerPage}
                setResultsPerPage={setResultsPerPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
              />
            }
          />
          <Route path="/About" element={<About />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
