import { useState } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

//hook
import { useEffect } from "react";
import { useAuthen } from "./hook/useAthentic";

//context
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateP from "./pages/CreatePost/CreateP";
import HomeR from "./pages/home/HomeR";
import IndiPag from "./pages/IndividualPage/IndiPag";
import EditPost from "./pages/Dashboard/EditPost";
import ERR from "./pages/404/ERR";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthen();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="App">
        <AuthProvider value={{ user }}>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/edit/:id" element={<EditPost />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                  path="/cadastro"
                  element={!user ? <Cadastro /> : <Navigate to="/" />}
                />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/search"
                  element={user ? <HomeR /> : <Navigate to="/" />}
                />
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/newpost"
                  element={user ? <CreateP /> : <Navigate to="/login" />}
                />
                <Route path="/posts/:id" element={<IndiPag />} />

                <Route path="/ERR" element={<ERR />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
