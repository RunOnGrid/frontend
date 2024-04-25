import React from 'react';
import { useRouter } from 'next/router';

const AuthComponent = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    const CLIENT_ID = 'Iv1.dc11b1e22135af26';
    const REDIRECT_URI = 'https://www.ongrid.run/profile/repositories';
    const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repos`;

    // Redirigir al usuario a la página de autorización de GitHub
    window.location.href = AUTH_URL;
  };

  return (
    <div>
      <p>Para iniciar sesión, haz clic en el siguiente botón:</p>
      <button onClick={handleLoginClick}>Iniciar sesión con GitHub</button>
    </div>
  );
};

export default AuthComponent;
