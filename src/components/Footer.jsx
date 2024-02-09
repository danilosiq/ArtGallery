import React from "react";
import "./Footer.css";
import dan from "../../public/dan.png";

const Footer = () => {
  return (
    <footer>
      <div className="card">
        <h3>Seja arte! Poste Arte!</h3>
        <p>ArtGallery &copy; 2024</p>
      </div>
      <a href="https://github.com/danilosiq">
        <div>
          <img src={dan} alt="" />
        </div>
        <div>
          <h3>Danilo D. Siqueira</h3>
          <p>Veja mais projetos como esse no Github!</p>
        </div>
      </a>
    </footer>
  );
};

export default Footer;
