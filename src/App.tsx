import Card from './components/Card';
import './App.css';
import { ChangeEvent, useEffect, useState } from 'react';

export type Categoria = {
  guid: string;
  title: string;
  completed: boolean;
}

function App() {
  const [CategoriaInput, setCategoriaInput] = useState('');
  const [Categorias, setCategorias] = useState<Categoria[]>(() => {

    const storedCategorias = localStorage.getItem('@codersList:Categorias');

    if (storedCategorias) {
      return JSON.parse(storedCategorias);
    }

    return [];
  });

  function guid() {
    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }
    var crypto = window.crypto || window.Crypto;
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}

  useEffect(() => {
    localStorage.setItem('@codersList:Categorias', JSON.stringify(Categorias))
  }, [Categorias])

  function addCategoria() {
    setCategorias((previousCategorias) =>
      [...previousCategorias, { guid: guid(), title: CategoriaInput, completed: false }]
    );
    setCategoriaInput('');
  }

  function completeCategoria(guid: string) {
    setCategorias((previousCategorias) =>
      previousCategorias.map((Categoria) => Categoria.guid !== guid ? Categoria : { ...Categoria, completed: !Categoria.completed })
    );

  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCategoriaInput(e.target.value);
  }

  function deleteCategoria(guid: string) {
    setCategorias((previousCategorias) => previousCategorias.filter((Categoria) => Categoria.guid !== guid));
  }

  return (

    <div className="App">
      <div className="logo" >
        <a target="_blank"><img src="../public/GBastos Logo.jpg" /></a>
      </div>


      <div className="add-Categoria">
        <h2>Gestão de Tarefas</h2>
          <input placeholder="" value={CategoriaInput} onChange={handleInputChange} />
        <button className="read-the-docs" onClick={addCategoria}>Incluir Tarefa</button>
      </div>

      {
        Categorias.map((Categoria) => (
          <Card key={Categoria.guid} Categoria={Categoria} completeCategoria={completeCategoria} deleteCategoria={deleteCategoria} />
        ))
      }
    </div>

  )
}

export default App
