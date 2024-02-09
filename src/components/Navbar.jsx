import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

import { useAuthen } from "../hook/useAthentic";

import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
  const {logout} = useAuthen()

  const { user } = useAuthValue();
  console.log(user);
  const [menu, setmenu] = useState(false);

  const handleMenu = () => {
    setmenu(!menu);
  };
  return (
    <>
      <nav>
        <Link to="/" className="title">
          Art <p>Gallery</p>
        </Link>
        <ul>
          <li>
            <NavLink to="/about">Sobre</NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/dashboard">Meus Posts</NavLink>
              </li>

              <li>
                <NavLink to="/newpost">Nova postagem</NavLink>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <NavLink to="/cadastro">Cadastrar-se</NavLink>
              </li>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <button onClick={logout} className="logout">Sair</button>
              </li>
            </>
          )}
        </ul>

        <button onClick={handleMenu} className="menuB">Menu</button>
      </nav>
      {menu && (
        <div className="PhoneFormaterNav">
          <button onClick={handleMenu}>Menu</button>
          <ul>
          <li>
            <NavLink to="/about">Sobre</NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/dashboard">Meus Posts</NavLink>
              </li>

              <li>
                <NavLink to="/newpost">Nova postagem</NavLink>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <NavLink to="/cadastro">Cadastrar-se</NavLink>
              </li>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <button onClick={logout}>Sair</button>
              </li>
            </>
          )}
        </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
