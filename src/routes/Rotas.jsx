import Entrar from "../pages/Entrar/Entrar";
import Registro from "../pages/Registrar/Registro";
import Home from "../pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../context/AuthContext";

function Rotas() {
  return (
    <>
      <AuthContextProvider
        filho={
          <Routes>
            <Route path="/" element={<Entrar />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        }
      ></AuthContextProvider>
    </>
  );
}
export default Rotas;
