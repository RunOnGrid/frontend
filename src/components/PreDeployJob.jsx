import Image from 'next/image';
import React, { use, useState } from 'react';

const PreDeployJob = ({visible}) => {
    const [expanded, setExpanded] = useState(false)
    const [span,setSpan] = useState('')
    const handleToggle = () => {
            setExpanded(!expanded)
    }
  return (
    <div>
      <div className="geolocation5">
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex',height:'40px' }}>
            <p>Grid Pre-Deploy </p>
            <span> </span>
            <Image
              onClick={() => setExpanded(!expanded)}
              src={expanded ? '/upArrow.png' : '/downNavbar.png'}
              alt=""
              width={expanded ? 15 : 20}
              height={expanded ? 15 : 20}
              style={{marginLeft:'auto'}}
            />
            <Image
              onClick={() => visible(false)}
              src="/delete.png"
              alt=""
              width={20}
              height={20}
            />
          </div>
        {expanded ?  <>
            <div className="contenedor-titulos-hosting-click-shared3">
              <span
                className={`spanHosting-clickeable-shared${
                  span === 'general' ? ' focus' : ''
                }`}
                onClick={() => setSpan('main')}>
                Main
              </span>
              <span
                className={`spanHosting-clickeable-shared${
                  span === 'resources' ? ' focus' : ''
                }`}
                onClick={() => setSpan( 'resources')}>
                Resources
              </span>
       
            </div>

            <div>

                {span === 'main' ?   <div>
                    <div style={{display:'flex'}}>
                <label style={{ marginLeft: '15px',width:'120px' }}> Start Command</label>

                <input
                  style={{
                    color:'white',
                    backgroundColor: '#0c1317',
                   
                  }}
                  placeholder='command'
                />
                    </div>
                    <div style={{display:'flex'}}>
                <label style={{ marginLeft: '15px', width:'120px' }}> Ports</label>

                <input
                  style={{
                    color:'white',
                    backgroundColor: '#0c1317',
                  }}
                  placeholder='ports'
                />
                    </div>

                <button className="save-changes"> Save Changes</button>
              </div> : ''}
              


              {span === 'resources' ?     <div >
                <div className="ranges2">
                  <label>CPU: 3</label>
                  <input
                    type="range"
                    name="range1"
                    min="3"
                    max="100"
                    step="1"
                  />
                </div>
                <div className="ranges2">
                  <label>RAM: 100</label>
                  <input
                    type="range"
                    name="range1"
                    min="100"
                    max="1000"
                    step="50"
                  />
                </div>
                <div className="ranges2">
                  <label>SSD: 256</label>
                  <input
                    type="range"
                    name="range1"
                    min="256"
                    max="1024"
                    step="256"
                  />
                </div>
                <button onClick={() => setExpanded(!expanded)} className="save-changes"> Save Changes</button>
              </div> : ''}
          
            </div>







          </> : ''}
          
        </div>
      </div>
    </div>
  );
};

export default PreDeployJob;
