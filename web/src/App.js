import React , { useState ,useEffect } from 'react';
import api from './services/api';

import './base.css';
import './app.css';
import './main.css';

import DevForm from './components/devform';
import DevItem from './components/devitem';

// Componente : Bloco isolado da web que não interfere no resto da aplicação. 
//1 componente por arquivo.
// Se cria um componente quando repetimos o mesmo trecho de código várias vezes;
// Ou quando se consegue isolar um pedaço do app sem interferir o resto do app.

// Estado: Informações mantidas pelo componente (Imutabilidade)

// Propriedade : Informações que o comp Pai passa para o comp filho


function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    };

    loadDevs();
  }, []);

  async function handleAddDev(data){

    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
    
  };

  return (
   <section className="app">
     <aside>
      <strong>Cadastrar</strong>

      <DevForm onSubmit={handleAddDev} />

     </aside>

     <main>

      <ul>
      {devs.map(dev => (
          <DevItem key={dev._id} dev={dev} />
        ))}
      </ul>

     </main>
   </section>
  );
}
export default App;