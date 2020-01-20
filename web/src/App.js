import React, { useEffect, useState } from 'react';
import api from './services/api';

import DevForm from './components/devForm'
import DevItem from './components/devItem'

import './global.css';
import './app.css';
import './sideBar.css';
import './main.css';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const respose = await api.get('/devs');
      setDevs(respose.data);
    };

    loadDevs();
  }, []);

  async function handleAddDev(data) {

    const reponse = await api.post('/devs', data);
    setDevs([...devs, reponse.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}></DevForm>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}></DevItem>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
