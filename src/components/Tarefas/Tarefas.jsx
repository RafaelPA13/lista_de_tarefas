import style from "./Tarefas.module.css";
import { TbTrash } from "react-icons/tb";

function Tarefas({ tarefa, feito, deletar }) {
  return (
    <li className={tarefa.completo ? style.tarefaConcluida : style.tarefa}>
      <div className={style.checkbox}>
        <input
          type="checkbox"
          onChange={() => {
            feito(tarefa);
          }}
        />
        <p>
          {tarefa.texto}
        </p>
      </div>
      <button
        className={style.lixo}
        onClick={() => {
          deletar(tarefa.id);
        }}
      >
        <TbTrash />
      </button>
    </li>
  );
}
export default Tarefas;
