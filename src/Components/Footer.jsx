import React from "react";
// import Logo from "../public/android-chrome-192x192.png"

// import { Fragment, useState } from "react";
// import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
// import {
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   QuestionMarkCircleIcon,
//   ShoppingBagIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";


const footerNavigation = {
  products: [
    { name: "Store", href: "/store" },
    { name: "Accessories", href: "#" },

  ],
  company: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ],
  customerService: [
    { name: "Contact", href: "/contact" },
    { name: "Shipping", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Warranty", href: "/warranty" },
    { name: "FAQ", href: "/faq" }
  ],
};

const Footer = () => {
  return (
    <footer aria-labelledby="footer-heading" className="bg-teal-950 mt-auto fixed bottom-0 w-full">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      

        <div className="border-t flex justify-center border-gray-100 py-4 text-center">
        <img src="../src/assets/GitHubIcon.png" className="mr-4"/>
          <p className="text-sm text-gray-500">

          &copy; { new Date().getFullYear() } Mendence 

          </p>
        </div>
      
    </footer>
  );
};

export default Footer;
