import React from 'react';
import { useRouter } from 'next/router';

const DeployedNavbar = () => {
  const router = useRouter();

  // Obtener el segmento de la URL actual para determinar el elemento seleccionado
  const currentPath = router.asPath.split('/').pop();

  return (
    <div className="contenedor-titulos-hosting-click-shared2">
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'notifications' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/notifications')}>
        Notifications
      </span>
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'activity' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/activity')}>
        Activity
      </span>
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'overview' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/overview')}>
        Overview
      </span>
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'logs' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/logs')}>
        Logs
      </span>
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'metrics' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/metrics')}>
        Metrics
      </span>
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'environment' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/environment')}>
        Environment
      </span>
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'build-settings' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/build-settings')}>
        Build settings
      </span>
      <span
        className={`spanHosting-clickeable-shared ${
          currentPath === 'settings' ? 'selected' : ''
        }`}
        onClick={() => router.push('/profile/project/settings')}>
        Settings
      </span>
    </div>
  );
};

export default DeployedNavbar;
