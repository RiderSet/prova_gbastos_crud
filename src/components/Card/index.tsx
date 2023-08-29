import { Categoria } from '../../App';
import './styles.css';

type CardProps = {
  Categoria: Categoria;
  completeCategoria: (guid: string) => void;
  deleteCategoria: (guid: string) => void;
}

export default function Card({ Categoria, completeCategoria, deleteCategoria }: CardProps) {
  function handleCompleteCategoria() {
    completeCategoria(Categoria.guid)
  }

  function handleDeleteCategoria() {
    deleteCategoria(Categoria.guid)
  }

  return (


    <div className={`card ${Categoria.completed ? 'done' : ''}`}>
      <h2>{Categoria.title}</h2>

      <div className="card-buttons">
        <button onClick={handleCompleteCategoria}>
          {Categoria.completed ? 'Retomar' : 'Completar'}
        </button>
        <button onClick={handleDeleteCategoria}>Deletar</button>
      </div>
      
    </div>
  )
}