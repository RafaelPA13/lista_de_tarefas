import style from "./Home.module.css";
import { LuPlus } from "react-icons/lu";
import Header from "../../components/Header/Header";
import Tarefas from "../../components/Tarefas/Tarefas";

import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { bd } from "../../services/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Home() {
  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [aviso, setAviso] = useState(false);

  const { user } = UserAuth();

  const nome = user.displayName;

  const tarefasFiltradas = tarefas.filter((filtro) => filtro.usuario == nome);

  const criar = async (e) => {
    e.preventDefault();
    if (input == "" || !isNaN(input)) {
      setAviso(true);
    } else {
      setAviso(false);
      await addDoc(collection(bd, "Tarefas"), {
        texto: input,
        completo: false,
        usuario: nome,
      });
      setInput("");
    }
  };

  useEffect(() => {
    const q = query(collection(bd, "Tarefas"));
    const escrever = onSnapshot(q, (querySnapshot) => {
      let listaDeTarefas = [];
      querySnapshot.forEach((doc) => {
        listaDeTarefas.push({ ...doc.data(), id: doc.id });
      });
      setTarefas(listaDeTarefas);
    });
    return () => {
      escrever;
    };
  }, []);

  const feito = async (tarefa) => {
    await updateDoc(doc(bd, "Tarefas", tarefa.id), {
      completo: !tarefa.completo,
    });
  };

  const deletar = async (id) => {
    await deleteDoc(doc(bd, "Tarefas", id));
  };

  return (
    <div className={style.body}>
      <Header nome={nome} />
      <form className={style.formTarefa} onSubmit={criar}>
        <h1>Lista de Tarefas</h1>
        <p className={aviso ? style.aviso : style.inativo}>
          A tarefa que você digitou é invalida
        </p>
        <div className={style.bodyForm}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            className={style.input}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={criar}>
            <LuPlus />
          </button>
        </div>
      </form>
      <div className={style.listaDeTarefas}>
        {tarefasFiltradas.length ? (
          <p
            className={style.Contador}
          >{`Você tem ${tarefas.length} tarefas`}</p>
        ) : null}
        <ul>
          {tarefasFiltradas.map((item, i) => (
            <Tarefas key={i} tarefa={item} feito={feito} deletar={deletar} />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Home;
