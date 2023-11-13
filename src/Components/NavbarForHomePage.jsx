import React, { useState, useEffect } from "react";
const NavbarForHomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full p-4 z-50 transition-all duration-500 ${
        scrollY > 0
          ? "bg-white  backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200"
          : "bg-white"
      }`}
    >
      {/* Your NavbarForHomePage content goes here */}
      <div className="container mx-auto">
        <p className="text-xl font-bold">Your Logo</p>
        {/* Add more navigation links or components */}
      </div>
    </nav>
  );
};

export default NavbarForHomePage;
