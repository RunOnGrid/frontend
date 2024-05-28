import Paginacion from '@/commons/Paginacion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ModalContact from '@/commons/ModalContact';
import ComponentCard from '@/commons/ComponentCard';
import ComponentCard2 from '@/commons/ComponentCard2';
import Dashboard from '@/components/profile/Dashboard';
const DynamicNavbar = dynamic(() => import('../../commons/SideNavbar'), {
  ssr: false,
  loading: () => <p> Im f</p>,
});

export default function LoggedLogin() {
  const [abierto, setAbierto] = useState(false);
  const [selected, setSelected] = useState(0);
  const [loginPhrase, setLoginPhrase] = useState('');

  useEffect(() => {
    // Recuperar el valor de loginPhrase de localStorage
    const storedData = localStorage.getItem('postData');

    if (storedData) {
      const postData = JSON.parse(storedData);
      // Actualizar el estado con el valor de loginPhrase
      setLoginPhrase(postData.loginPhrase);
    }
  }, []);

  const toggle = (i) => {
    return setSelected(i);
  };
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <div className={abierto ? 'blureado' : ''}>
        <div className="logged-home-component2">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <DynamicNavbar abierto={abierto} setAbierto={setAbierto} />
            <div
              style={{
                marginRight: 'auto',
                width: '100%',
              }}>
              <Dashboard />
              {/* <div className="contents-index">
                <div style={{ width: '100%' }}>
                  <div className="titulos-dashboard">
                    <h2> My Applications </h2>
                    <button>
                      {' '}
                      <Link href="/profile/newApplication">
                        {' '}
                        + New Application
                      </Link>{' '}
                    </button>
                  </div>
                  <div className="grid-components">
                    <ComponentCard />
                    <ComponentCard2 />
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className="separador-horizontal"></div>

                  <div className="filter-index">
                    <span> Sort by: </span>
                    <select>
                      <option value="Lates">Latest</option>
                      <option value="Active">Active</option>
                      <option value="Failed">Failed</option>
                    </select>
                    <span> Search: </span>
                    <input />
                    <p> Filters</p>
                    <span> Show:</span>
                    <div className="checkbox-filter">
                      <input type="checkbox" />
                      <label>Active</label>
                    </div>
                    <div className="checkbox-filter">
                      <input type="checkbox" />
                      <label>Suspended</label>
                    </div>
                    <div className="checkbox-filter">
                      <input type="checkbox" />
                      <label>All</label>
                    </div>

                    <span> Status:</span>
                    <div className="checkbox-filter">
                      <input type="checkbox" />
                      <label>Deployed</label>
                    </div>
                    <div className="checkbox-filter">
                      <input type="checkbox" />
                      <label>Failed to deploy</label>
                    </div>
                    <div className="checkbox-filter">
                      <input type="checkbox" />
                      <label>All</label>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {abierto ? (
        <ModalContact abierto={abierto} setAbierto={setAbierto} />
      ) : (
        ''
      )}
    </div>
  );
}
