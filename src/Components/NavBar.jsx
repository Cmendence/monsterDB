// import React from 'react'
// import { Link } from 'react-router-dom';

// export default function NavBar() {

//    return (

// <nav className="bg-teal-950 shadow-md">
//   <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//     <div className="relative flex h-16 items-center justify-between">
//       <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//         {/* <!-- Mobile menu button--> */}
//         <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-teal-200 hover:bg-teal-600 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500" aria-controls="mobile-menu" aria-expanded="false">
//           <span className="absolute -inset-0.5"></span>
//           <span className="sr-only">Open main menu</span>
//           {/* <!--
//             Icon when menu is closed.

//             Menu open: "hidden", Menu closed: "block"
//           --> */}
//           <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
//           </svg>
//           {/* <!--
//             Icon when menu is open.

//             Menu open: "block", Menu closed: "hidden"
//           --> */}
//           <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//       <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//         <div className="flex flex-shrink-0 items-center">
//           <img className="h-8 w-auto" src="../public/android-chrome-192x192.png" alt="Dragon" />
//         </div>
//         <div className="hidden sm:ml-6 sm:block">
//           <div className="flex space-x-4">
//             {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
//             <Link to="/" className='text-gray-200 hover:bg-teal-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>Home</Link>
//             <Link to="" className="text-gray-200 hover:bg-teal-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Filter</Link>
//             <Link to="/allMonsters" className="text-gray-200 hover:bg-teal-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium">All Monsters</Link>
//           </div>
//         </div>
//       </div>

//     </div>
//   </div>

//   {/* <!-- Mobile menu, show/hide based on menu state. --> */}
//   <div className="sm:hidden" id="mobile-menu">
//     <div className="space-y-1 px-2 pb-3 pt-2">
//       {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
//       <Link to="/" className="text-gray-300 hover:bg-teal-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Home</Link>
//       <Link to="" className="text-gray-300 hover:bg-teal-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Filter</Link>
//       <Link to="/allMonsters" className="text-gray-300 hover:bg-teal-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium">All Monsters</Link>
//     </div>
//   </div>
// </nav>

//     );
//   }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import DragonLogo from "/android-chrome-512x512.png"

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-teal-950 shadow-md sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-teal-200 hover:bg-teal-600 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? "hidden" : "block"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? "block" : "hidden"}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <img
              className="h-10 w-auto"
              src={DragonLogo}
              alt="Dragon"
            />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-gray-200 hover:bg-teal-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to=""
                  className="text-gray-200 hover:bg-teal-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Filter
                </Link>
                <Link
                  to="/allMonsters"
                  className="text-gray-200 hover:bg-teal-600 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  All Monsters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div
        className={`sm:hidden ${mobileMenuOpen ? "block" : "hidden"} `}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          <div className="sm:hidden" id="mobile-menu">
            <Link
              to="/"
              className="text-gray-300 active:bg-teal-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium focus:bg-purple-600"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to=""
              className="text-gray-300 active:bg-teal-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium focus:bg-purple-600"
              onClick={toggleMobileMenu}
            >
              Filter
            </Link>
            <Link
              to="/allMonsters"
              className="text-gray-300 active:bg-teal-600 hover:text-white block rounded-md px-3 py-2 text-base font-medium focus:bg-purple-600"
              onClick={toggleMobileMenu}
            >
              All Monsters
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
