import React from "react";
import GitHubIcon from "/GitHubIcon.png"
import LinkedInIcon from "/linkedin-3-24.png"

const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-teal-950 mt-auto fixed bottom-0 w-full"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="border-t flex justify-center items-center border-gray-100 py-3 text-center">
        <a
          href="https://github.com/Cmendence/monsterDB/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GitHubIcon} className="mr-4" />
        </a>
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CMendence
        </p>
        <a
          href="https://www.linkedin.com/in/cmendence/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={LinkedInIcon} className="ml-4" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
