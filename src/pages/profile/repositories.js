import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Paginacion from '@/commons/Paginacion';
import { parse } from 'cookie';
import "dotenv/config"




const Repositories = ({ username, accessToken, data }) => {


 

  const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
    ssr: false,
    loading: () => <p> Im f</p>,
  });

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    // Fetch user repositories
    const fetchUserRepositories = async () => {
      try {
        const response = await axios.get(data.repos_url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRepositories(response.data);
      } catch (error) {
        console.error('Error fetching user repositories', error);
        setRepositories([]);
      }
    };

    fetchUserRepositories();
  }, [accessToken, data.repos_url]);

  const modifyRepo = async (name) => {
    try {
      const fullName = `${username}/${name}`;
      const response = await axios.post('/api/github/modifyRepo', {
        name: name,
        fullName: fullName,
      });
      console.log(response.data);
      // Maneja el mensaje de éxito si es necesario
    } catch (error) {
      console.error('Error modificando el repositorio', error);
      // Maneja el mensaje de error si es necesario
    }
  };;



   // Function to fetch repository contents
   const fetchRepoContents = async (repo) => {
    try {
      const storedToken = Cookies.get('githubAccessToken');
      const response = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents`, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Replace with your access token
        },
      });

      setSelectedRepoContents(response.data);
    } catch (error) {
      console.error('Error fetching repository contents', error);
      setSelectedRepoContents(null);
    }
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
        <h1>Lista de Repositorios de {username}</h1>
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>{repo.name}
              <button onClick={() => modifyRepo(repo.name)}>Modificar</button>
            </li>
            
          ))}
        </ul>
      </div>
    </div>
  </div>
  
   
  );
};

export async function getServerSideProps(context) {
  
  const storedToken = parse(context.req.headers.cookie || '').githubAccessToken;

  if (storedToken) {
    try {
      
      const userResponse = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
  
    
      const username = userResponse.data.login;
      const data = userResponse
  
      return {
        props: { username,data },
      };
    } catch (error) {
      console.error('Error al obtener la información del usuario', error);
      return {
        props: { username: null },
      };
    }
  }

 
  const code = context.query.code;

  if (!code) {
    const CLIENT_ID = process.env.CLIENT_ID;
    const REDIRECT_URI = 'https://www.ongrid.run/repos';
    const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user`;
  
    
    context.res.writeHead(302, { Location: AUTH_URL });
    context.res.end();
    return { props: {} };
  }
  
  try {
    
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = 'https://www.ongrid.run/profile/repositories';
  
    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
    };
  
    const response = await axios.post('https://github.com/login/oauth/access_token', null, {
      params: params,
      headers: {
        Accept: 'application/json',
      },
    });
  
    const accessToken = response.data.access_token;
  
  
    context.res.setHeader('Set-Cookie', `githubAccessToken=${accessToken}; Path=/; SameSite=None; Secure; HttpOnly`);
  

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const username = userResponse.data.login;
  
    return {
      props: { username,accessToken, data: userResponse.data },
    };
  } catch (error) {
    console.error('Error al obtener la información del usuario', error);
    return {
      props: { username: null },
    };
  }
}

export default Repositories;