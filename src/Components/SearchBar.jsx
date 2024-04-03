export default function SearchBar({ query, setQuery, setCurrentPage }) {
  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === 13) {
      // Close the keyboard by blurring the input element
      e.target.blur();

      handleSearch();
    }
  };

  const clearSearch = (e) => {
    setQuery("");
    setCurrentPage(1);
  };

  const magnifyingGlass = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );

  const xIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className=" flex justify-center my-2">
      <div className="relative w-[215px]">
        <button
          className="text-violet-700 focus:outline-none absolute top-3 -left-5"
          onClick={handleSearch}
          type="button"
        >
          {magnifyingGlass}
        </button>
        <input
          type="text"
          placeholder="Search Monsters"
          className="w-48 p-1 pr-6 border-2  border-violet-500 rounded-lg text-sm m-2 focus:border-violet-700 focus:outline-none text-gray-600 "
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {query && (
          <button
            className={`text-violet-700 focus:outline-none absolute right-5 top-3`}
            onClick={clearSearch}
            type="button"
            onPointerDown={(e) => e.preventDefault()}
          >
            {xIcon}
          </button>
        )}
      </div>
    </div>
  );
}
