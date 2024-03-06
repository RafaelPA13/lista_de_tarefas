import style from "./Registro.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function Registro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const { cadastro } = UserAuth();

  const cadastroDeUsuario = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      await cadastro(nome, email, senha);
      navigate("/");
    } catch (error) {
      setErro(error.message);
      console.log(error.message);
    }
  };

  return (
    <div className={style.body}>
      <form className={style.formulario} onSubmit={cadastroDeUsuario}>
        <h1>Lista de Tarefas</h1>
        <input
          type="text"
          placeholder="Nome:"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Senha:"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
          }}
        />
        <div className={style.link}>
          <p>Já possui uma conta?</p>
          <a href="/">Entre</a>
        </div>
        <button onClick={cadastroDeUsuario}>Registrar</button>
      </form>
    </div>
  );
}

export default Registro;
