import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Paginacion from '@/commons/Paginacion';
import { parse } from 'cookie';
import 'dotenv/config';
import back from '../../../axios';

const Repositories = () => {
  const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
    ssr: false,
    loading: () => <p> Im f</p>,
  });

  const [repositories, setRepositories] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const userGrid = localStorage.getItem('userGrid');
        const response = await back.get(`/api/getRepositories/${userGrid}`);

        setRepositories(response.data);
      } catch (error) {
        console.error('Error obteniendo los repositorios', error);
      }
    };

    fetchRepositories();
  }, []);

  const modifyRepo = async (repo, owner) => {
    try {
      const fullName = `${owner}/${repo}`;
      const response = await back.post('/api/github/modifyRepo', {
        name: repo,
        fullName: fullName,
        buildpack: selectedClient,
      });
      console.log(response);
      // Maneja el mensaje de éxito si es necesario
    } catch (error) {
      console.error('Error modificando el repositorio', error);
      // Maneja el mensaje de error si es necesario
    }
  };
  const handleClientSelection = (client) => {
    setSelectedClient(client);
  };
  const toggle = (i) => {
    return setSelected(i);
  };
  const [visible, setVisible] = useState(true);
  const toggleSideBar = () => {
    return setVisible(!visible);
  };

  return (
    <div>
      <div className="logged-home-component">
        <DynamicNavbar />
        <Paginacion anterior="Home" links="/profile" titulo="Repositories" />
        <div className="contenedor-repositories">
          <h1>Lista de Repositorios </h1>
          <ul>
            {repositories.map((repo) => (
              <li key={repo.id}>
                {repo.name}
                <button onClick={() => modifyRepo(repo.name, repo.owner)}>
                  Modificar
                </button>
                <button onClick={() => handleClientSelection('docker')}>
                  Docker
                </button>
                <button onClick={() => handleClientSelection('git')}>
                  Git
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Repositories;
