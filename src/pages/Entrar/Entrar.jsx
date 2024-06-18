import style from "./Entrar.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function Entrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState(false)

  const navigate = useNavigate()

  const { logar } = UserAuth()

  const login = async (e) => {
    e.preventDefault()
    setErro("")
    setAviso("")
    try {
      await logar(email, senha)
      navigate('/home')
    } catch (error) {
      setErro('Email ou senha invalidos')
      setAviso(true)
    }
  };

  const logarRecrutador = () => {
    logar('recrutador@email.com', 123456)
    navigate('/home')
  }

  return (
    <div className={style.body}>
      <form className={style.formulario} onSubmit={login}>
        <h1>Lista de Tarefas</h1>
        <p className={aviso ? style.aviso : style.inativo}>Erro: {erro}</p>
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
          <p>Não possui conta?</p>
          <a href="/registro">Registrar-se</a>
        </div>
        <button onClick={login}>Entrar</button>
        <button onClick={logarRecrutador}>Entrar como Recrutador(a)</button>
      </form>
    </div>
  );
}
export default Entrar;
