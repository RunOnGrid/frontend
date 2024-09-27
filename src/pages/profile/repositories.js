import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import { parse } from "cookie";

import "dotenv/config";
import back from "../../../axios";
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/", // Puedes redirigir a una página de "Próximamente" o similar
      permanent: false,
    },
  };
}
const Repositories = () => {
  const DynamicNavbar = dynamic(() => import("../../commons/SideNavbar"), {
    ssr: false,
    loading: () => <p> Im f</p>,
  });

  const [repositories, setRepositories] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const userGrid = localStorage.getItem("userGrid");
        const response = await back.get(`/api/getRepositories/${userGrid}`);

        setRepositories(response.data);
      } catch (error) {
        console.error("Error obteniendo los repositorios", error);
      }
    };

    fetchRepositories();
  }, []);

  const modifyRepo = async (repo, owner) => {
    try {
      const fullName = `${owner}/${repo}`;
      const response = await back.post("/api/github/modifyRepo", {
        name: repo,
        fullName: fullName,
        buildpack: selectedClient,
      });
      console.log(response);
    } catch (error) {
      console.error("Error modificando el repositorio", error);
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
        <div className="contenedor-repositories">
          <h1>Lista de Repositorios </h1>
          <ul>
            {repositories.map((repo) => (
              <li key={repo.id}>
                {repo.name}
                <button onClick={() => modifyRepo(repo.name, repo.owner)}>
                  Modificar
                </button>
                <button onClick={() => handleClientSelection("docker")}>
                  Docker
                </button>
                <button onClick={() => handleClientSelection("git")}>
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
