import React, { useState, useEffect, useRef } from 'react';
import WhatApp from './deployBoxes/WhatApp';
import NameBox from './deployBoxes/NameBox';
import DeployMethod from './deployBoxes/DeployMethod';
import EnvVariables from './deployBoxes/EnvVariables';
import PreDeploy from './deployBoxes/PreDeploy';
import  NewServices  from './deployBoxes/NewServices';
import  Details  from './deployBoxes/Details';
import PayApp from './deployBoxes/PayApp';

const NewApplicationj = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const nameRef = useRef(null);
  const detailsRef = useRef(null);
  const servicesRef = useRef(null);
  const deployRef = useRef(null);
  const envRef = useRef(null);
  const preDeployRef = useRef(null);
  const payRef = useRef(null);

  useEffect(() => {
    if (activeStep === 1) {
      nameRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeStep === 2) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeStep === 3) {
      servicesRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeStep === 4) {
      deployRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeStep === 5) {
      envRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeStep === 6) {
      preDeployRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (activeStep === 7) {
      payRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeStep]);

  const handleCompleteStep = (step) => {
    setCompletedSteps(prevSteps => [...prevSteps, step]);
    setActiveStep(step + 1);
  };

  return (
    <>
    <div style={{opacity:'0'}}>.</div>
      <div className="contenedor-newApp">
        <div className="contenedor-flex-only4">
          <div className="div-newApp"> LET&apos;S GET STARTED!</div>
        </div>
        <NameBox onNextStep={() => handleCompleteStep(1)} ref={nameRef} />
        {completedSteps.includes(1) && <Details onNextStep={() => handleCompleteStep(2)} ref={detailsRef} />}
        {completedSteps.includes(2) && <NewServices onNextStep={() => handleCompleteStep(3)} ref={servicesRef} />}
        {completedSteps.includes(3) && <DeployMethod onNextStep={() => handleCompleteStep(4)} ref={deployRef} />}
        {completedSteps.includes(4) && <EnvVariables onNextStep={() => handleCompleteStep(5)} ref={envRef} />}
        {completedSteps.includes(5) && <PreDeploy onNextStep={() => handleCompleteStep(6)} ref={preDeployRef} />}
        {completedSteps.includes(6) && <PayApp onNextStep={() => handleCompleteStep(7)} ref={payRef} />}
        {completedSteps.includes(7) &&  <>
          <div style={{ marginBottom:'30px',fontWeight:'bold'}} className="div-newApp"> WE&apos;RE DONE!</div>
          <button className='deploy-now'> Deploy now</button>
        </>}
      </div>
      <div style={{opacity:'0'}}>.</div>
    </>
  );
};

export default NewApplicationj;


{/* <span className="span-newApp"> Application name </span>
        <span className="span-newApp2">
          {' '}
          Only Lowercase and Uppercase letters.{' '}
        </span>
        <input className="input-newApp" placeholder="ex: gridproject" />

        <span style={{ marginTop: '40px' }} className="span-newApp">
          {' '}
          Deployment Method{' '}
        </span>
        <span className="span-newApp2">
          {' '}
          Deploy from a Git repository or a Docker registry.{' '}
        </span>
        <div className="contenedor-flex-only">
          <div className="card-newApp">
            <Image
              className="icon-card-newApp"
              src="/iconGit.png"
              alt="/iconGit.png"
              height={50}
              width={50}
            />
            <span className="span-newApp"> Git repository </span>
            <span className="span-newApp2">
              {' '}
              Deploy using source from a Git repo.{' '}
            </span>
         
          </div>
          <div style={{ marginLeft: '30px' }} className="card-newApp">
            <Image
              className="icon-card-newApp"
              src="/iconDocker.webp"
              alt="/iconGit.png"
              height={50}
              width={50}
            />
            <span className="span-newApp"> Docker registry </span>
            <span  className="span-newApp2">
              {' '}
              Deploy a container from an image registry.{' '}
            </span>
            <input  placeholder='Docker image namespace/repository:tag' />
          </div>
        </div>
       
        <span style={{ marginTop: '40px' }} className="span-newApp">
          {' '}
          Application services{' '}
        </span>
        <button onClick={() => setModal(true)} className="button-newApp">
          {' '}
          + Add a new service{' '}
        </button> */}
        {/* {modal ? (
          <div className="modal-newApp">
            <div className="contenedor-flex2">
              <h1> Add a new service </h1>
              <img
                onClick={() => {
                  setModal(false);
                }}
                style={{ cursor: 'pointer' }}
                alt=""
                src="/menuCerrado.png"
              />
            </div>
            <span>Select a service type:</span>
            <div className="contenedor-flex2">
              <select>
                <option> Web </option>
                <option> Worker</option>
                <option> Cron Job</option>
              </select>
            </div>
            <span>Name this service:</span>
            <input placeholder="ex:my-service" />
            <button
              onClick={() => {
                setModal(false);
              }}>
              {' '}
              + Add service{' '}
            </button>
          </div>
        ) : (
          ''
        )} */}
        {/* <div className="webCard-newApp">
          <div className="titulo-webCard">
            <div className="contenedor-flex-only">
              <img className="icon-webCard" alt="" src="/downNavbar.png" />
              <img className="icon-webCard" alt="" src="/web.png" />
              <span> web </span>
            </div>
          </div>
          <div className="opciones-webCard">
            <div
              style={{ marginLeft: '0px', width: '100%' }}
              className="contenedor-titulos-hosting-click-shared">
              <span
                className={`spanHosting-clickeable-shared${
                  selected === 0 ? 'focus' : ''
                }`}
                onClick={() => toggle(0)}>
                Main
              </span>
              <span
                className={`spanHosting-clickeable-shared${
                  selected === 1 ? 'focus' : ''
                }`}
                onClick={() => toggle(1)}>
                {' '}
                Resources
              </span>
              <span
                className={`spanHosting-clickeable-shared${
                  selected === 2 ? 'focus' : ''
                }`}
                onClick={() => toggle(2)}>
                {' '}
                Advanced
              </span>
            </div>
            <span
              style={{ display: 'flex', margin: '20px' }}
              className="span-newApp2">
              {' '}
              Start command{' '}
            </span>
            <input
              style={{ display: 'flex', margin: '20px' }}
              className="input-newApp"
              placeholder="npm start"
            />

            <span
              style={{ display: 'flex', margin: '20px' }}
              className="span-newApp2">
              {' '}
              Container port{' '}
            </span>
            <input
              style={{ display: 'flex', margin: '20px' }}
              className="input-newApp"
              placeholder="3000"
            />
          </div>
        </div>
          <span style={{ marginTop: '40px' }} className="span-newApp">
          {' '}
          Environment variables(optional){' '}
        </span>
        <span className="span-newApp2">
          {' '}
          Deploy from a Git repository or a Docker registry.{' '}
        </span>
        <button onClick={() => setModal(true)} className="button-newApp">
          {' '}
          + Add Row{' '}
        </button>

        <span style={{ marginTop: '40px' }} className="span-newApp">
          {' '}
         Pre-deploy job(optional){' '}
        </span>
        <span className="span-newApp2">
          {' '}
          If specified, this is a job that will be run before every deployment.{' '}
        </span>
        <button onClick={() => setModal(true)} className="button-newApp">
          {' '}
          + Add a new pre-deploy job{' '}
        </button>
        <button className='boton-deploy'> Deploy app</button> */}