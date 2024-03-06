import style from "./Header.module.css";
import { TbLogout2 } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function Header({nome}) {
  const { sair } = UserAuth();

  const navigate = useNavigate();

  const deslogar = async () => {
    try {
      await sair()
      navigate('/')
      console.log('Você saiu!')
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <header>
      <h1 className={style.nome}>{nome}</h1>
      <button className={style.sair} onClick={deslogar}>
        <TbLogout2 />
      </button>
    </header>
  );
}
export default Header;
