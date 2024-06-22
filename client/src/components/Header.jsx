import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/img/logo-apuntados.png";
import { IconLogin2 } from "@tabler/icons-react";

function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-[#09090B] shadow-[#1d1d1d] shadow-md">
      <div className="font-inter flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <img src={Logo} alt="" className="w-auto h-10" />
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hover:text-white text-white/80 transition-colors">
              Inicio
            </li>
          </Link>
          <Link to="/about">
            <li className="hover:text-white text-white/80 transition-colors">
              ¿Quienes somos?
            </li>
          </Link>
        </ul>
        <div className="flex items-center gap-5 text-white/80">
          <form
            onSubmit={handleSubmit}
            className="border-x-1 border-y-1 text-white/80 items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed ring-offset-background border  hover:bg-[#27272A] hover:text-accent-foreground h-10 py-2 px-4 text-muted-foreground hidden w-64 justify-between gap-3 text-sm lg:inline-flex"
          >
            <input
              className="bg-transparent focus:outline-none w-24 sm:w-64 text-white/80"
              type="text"
              placeholder="Buscar"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconSearch className="text-white/80" />
          </form>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <div className="focus:bg-accent rounded-lg bg-transparent p-2 text-black duration-300 hover:bg-gray-200 focus:outline-none dark:text-white hover:dark:bg-gray-800">
                <li className="flex gap-2 hover:text-white text-white/80 transition-colors">
                  <IconLogin2
                    stroke={2}
                    color="white"
                    className="hover:text-white text-white/80 transition-colors"
                  />
                  Iniciar Sesión
                </li>
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
