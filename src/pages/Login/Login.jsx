import React, { useEffect, useState } from "react";
import "./Login.css";
import img from "./login.png";
import { useAuthen } from "../../hook/useAthentic";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const { login, error: AthERR, loading } = useAuthen();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const user = {
      email,
      password,
    };
    const res = await login(user);
    console.log(res);
  };

  useEffect(() => {
    if (AthERR) {
      setError(AthERR);
    }
    console.log(AthERR);
  }, [AthERR]);
  return (
    <div className="LogContainer">
      <div className="partone">
        <img src={img} alt="" />
      </div>
      <div className="parttwo">
        <div className="intro">
          <h1>Faça seu Login!</h1>
          <p>Participe como usuario!</p>
        </div>
        <hr />
        <div className="form">
          <form>
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
              <input type="password" placeholder="Senha" className="textarea" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br />
            {!loading && <button onClick={handleLogin}>Entrar!</button>}
            {loading && <button disabled>carregando...</button>}
            
          </form>
          {error && (
            <div className="errorCamp">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
