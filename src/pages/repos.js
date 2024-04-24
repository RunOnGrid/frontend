import axios from 'axios';
import AuthComponent from '@/components/github/AuthComp';
import { useState } from 'react';

const ReposPage = ({ repos }) => {
  const selectedRepo = repos[0];
  const [repoContents, setRepoContents] = useState(null);

  // useEffect(() => {
  //   if (selectedRepo) {
  //     fetchRepoContents(selectedRepo);
  //   }
  // }, [selectedRepo]);

  // const fetchRepoContents = async (repo) => {
  //   try {
  //      // Utiliza el código de autorización para obtener el token de acceso
  //   const CLIENT_ID = 'Iv1.4c4e4dcaca465cb4';
  //   const CLIENT_SECRET = '4067558e0ad02b61718229a88176b7362afa1bb7';
  //   const REDIRECT_URI = 'http://localhost:3000/dashboard/repositories';

  //   const params = {
  //     client_id: CLIENT_ID,
  //     client_secret: CLIENT_SECRET,
  //     code: code,
  //     redirect_uri: REDIRECT_URI,
  //   };
  //   const response1 = await axios.post('https://github.com/login/oauth/access_token', null, {
  //     params: params,
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //   });

  //   const accessToken = response.data.access_token;

  //     const response = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`, // Replace with your access token
  //       },
  //     });

  //     setRepoContents(response.data);
  //   } catch (error) {
  //     console.error('Error fetching repository contents', error);
  //     setRepoContents(null);
  //   }
  // };

  return (
    <div>
      <AuthComponent />
      {/* {repoContents ? (
        <RepoDetails repoContents={repoContents} />
      ) : (
        <p>Loading repository contents...</p>
      )} */}
    </div>
  );
};

export async function getServerSideProps(context) {
  // Obtén el código de autorización de la URL de la solicitud

  const code = '21';
  // Si no hay código de autorización, redirige a la página de autorización de GitHub
  if (code) {
    const CLIENT_ID = 'Iv1.dc11b1e22135af26';
    const REDIRECT_URI = 'https://www.ongrid.run/profile/repositories';
    const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repos`;

    // Redirige al usuario a la página de autorización de GitHub
    context.res.writeHead(302, { Location: AUTH_URL });
    context.res.end();
    return { props: {} };
  }

  try {
    // Utiliza el código de autorización para obtener el token de acceso
    const CLIENT_ID = 'Iv1.dc11b1e22135af26';
    const CLIENT_SECRET = '921ae413f1c27dba4711650d8a9937a09d8561b5';
    const REDIRECT_URI = 'https://www.ongrid.run/profile/repositories';

    const params = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
    };

    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: params,
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const accessToken = response.data.access_token;

    // Guarda el nuevo accessToken en las cookies
    context.res.setHeader(
      'Set-Cookie',
      `githubAccessToken=${accessToken}; Path=/; SameSite=None; Secure; HttpOnly`
    );

    // Utiliza el token de acceso para obtener la información del usuario autenticado
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const username = userResponse.data.login;

    return {
      props: { username },
    };
  } catch (error) {
    console.error('Error al obtener la información del usuario', error);
    return {
      props: { username: null },
    };
  }
}

export default ReposPage;
