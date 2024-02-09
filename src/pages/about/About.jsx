import React from "react";
import "./About.Module.css";
import danAbout from "./danAbout.png";

const About = () => {
  return (
    <div className="About">
      <div className="partone">
        <h1>Sobre o ArtGallery</h1>

        <div className="textcamp">
          <h2>Objetivo do Blog:</h2>
          <p>
            O ArtGalley é um blog desenvolvido por Danilo Dante Siqueira como
            parte de seu estudo em ReactJS.
          </p>
        </div>

        <div className="textcamp">
          <h2>Aprendizados no Projeto:</h2>
          <h3>conhecimento em diversas áreas, incluindo</h3>
          <ul>
            <li>Manipulação do Firebase para armazenamento de dados.</li>
            <li>
              Implementação de autenticação de usuários e cadastro de novos
              membros.
            </li>
            <li>Utilização de hooks para simplificar e organizar o código</li>
            <li>
              Uso de Provider e useContext para gerenciar o estado global da
              aplicação.
            </li>
          </ul>
        </div>

        <div className="textcamp">
          <h2>Funcionalidades Principais:</h2>
          <ul>
            <li>
              Os usuários podem postar suas próprias obras de arte no blog.
            </li>
            <li>
              A comunidade artística pode interagir através de comentários e
              feedback.
            </li>
            <li>
              O blog serve como uma plataforma para compartilhar e apreciar a
              criatividade dos membros.
            </li>
          </ul>
        </div>

        <div className="textcamp">
          <h2>Objetivo Final:</h2>
          <p>
            Criar um ambiente online onde artistas possam se expressar
            livremente e receber apoio da comunidade, enquanto Danilo continua
            seu aprendizado em ReactJS e aprimora suas habilidades de
            desenvolvimento web.
          </p>
        </div>
      </div>

      <div className="parttwo">
        <img src={danAbout} alt="" />
      </div>
    </div>
  );
};

export default About;
