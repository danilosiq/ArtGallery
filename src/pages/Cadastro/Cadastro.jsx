import React, { useEffect, useState } from "react";
import "./Cadastro.css";
import img from "./cad.png";
import { useAuthen } from "../../hook/useAthentic";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {

  const [displayName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coPassword, setCoPassword] = useState("");

  const [error, setError] = useState("");

  const { createUser, error: AthERR, loading, logout } = useAuthen();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const user = {
      displayName,
      email,
      password,
    };

    const res = await createUser(user);
    logout()
  
    console.log(res);

    setCoPassword("");
    setEmail("");
    setuserName("");
    setPassword("");

    if (password != coPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }
  };

  useEffect(() => {
    if (AthERR) {
      setError(AthERR);
    }
  }, [AthERR]);
  return (
    <div className="CadContainer">
      <div className="partone">
        <div className="intro">
          <h1>Faça seu Cadastro!</h1>
          <p>Participe desta comunidade!</p>
        </div>
        <hr />
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Nome de usuario: <br />
              <input
                type="text"
                placeholder="Nome de usuario"
                className="textarea"
                value={displayName}
                onChange={(e) => setuserName(e.target.value)}
              />
            </label>
            <br />
            <label htmlFor="email">
              Email: <br />
              <input
                type="Email"
                placeholder="Email"
                className="textarea"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label htmlFor="password">
              Senha: <br />
              <input
                type="password"
                placeholder="Senha"
                className="textarea"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label htmlFor="ConfirmPassword">
              Confirme sua senha: <br />
              <input
                type="password"
                placeholder="Confirme sua senha"
                className="textarea"
                value={coPassword}
                onChange={(e) => setCoPassword(e.target.value)}
              />
            </label>
            <br />

            {!loading && <button>Cadastrar-se!</button>}
            {loading && <button disabled>carregando</button>}
          </form>
          {error && (
            <div className="errorCamp">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="parttwo">
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default Cadastro;
