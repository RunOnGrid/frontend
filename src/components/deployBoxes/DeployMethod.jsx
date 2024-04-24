import Image from 'next/image';
import React, { forwardRef, use, useEffect, useRef, useState } from 'react';

import Step1 from '@/components/github/githubSteps/Step1';
import Step2 from '@/components/github/githubSteps/Step2';
import Step3 from '@/components/github/githubSteps/Step3';
import Step4 from '@/components/github/githubSteps/Step4';
import BuildpackModal from '@/components/github/githubSteps/BuildpackModal';
import Step1Docker from '@/components/docker/Step1Docker';
import Steps2Docker from '@/components/docker/Step2Docker';

const DeployMethod = forwardRef(({ onNextStep }, ref) => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(null);
  const [repo, setRepo] = useState('');
  const [gits, setGits] = useState(false);
  const [docker, setDocker] = useState(false);

  const git = useRef(null);
  const step1 = useRef(null);
  const step2 = useRef(null);
  const step3 = useRef(null);
  const step4 = useRef(null);
  const step1Docker = useRef(null);
  const step2Docker = useRef(null);
  const payRef = useRef(null);

  useEffect(() => {
    if (completedSteps.length > 0) {
      setActiveStep(completedSteps[completedSteps.length - 1] + 1);
    }
  }, [completedSteps]);

  const handleCompleteStep = (step, repo) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);
    setRepo(repo);
    setGits(true);
    setDocker(false);
  };

  const handleCompleteStep2 = (step) => {
    setCompletedSteps((prevSteps) => [...prevSteps, step]);

    setGits(false);
    setDocker(true);
  };

  return (
    <div ref={ref}>
      <Image
        style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
        alt=""
        width={25}
        height={25}
        src="/dot.png"
      />
      <div className="deployMethod-container">
        <h3>Select a deployment method</h3>
        <span>Deploy from a Git repository or a Docker registry.</span>
        <div className="contenedor-flex-only">
          <div className="card-newApp">
            <div onClick={() => handleCompleteStep(1)} className="icono-titulo">
              <Image
                className="icon-card-newApp"
                src="/iconGit.png"
                alt="/iconGit.png"
                height={50}
                width={50}
              />
              <span className="span-newApp"> Git repository </span>
            </div>
            <span className="span-newApp2">
              {' '}
              Deploy using source from a Git repo.{' '}
            </span>
          </div>
          <div
            onClick={() => handleCompleteStep2(5)}
            style={{ marginLeft: '30px' }}
            className="card-newApp">
            <div className="icono-titulo">
              <Image
                className="icon-card-newApp"
                src="/iconDocker.webp"
                alt="/iconGit.png"
                height={50}
                width={50}
              />
              <span className="span-newApp"> Docker registry </span>
            </div>
            <span className="span-newApp2">
              {' '}
              Deploy a container from an image registry.{' '}
            </span>
            <input placeholder="Docker image namespace/repository:tag" />
          </div>
        </div>
        {gits ? (
          <>
            {completedSteps.includes(1) && (
              <Step1 onNextStep={() => handleCompleteStep(2)} ref={step1} />
            )}
            {completedSteps.includes(2) && (
              <Step2
                repo={repo}
                onNextStep={(repo) => handleCompleteStep(3, repo)}
                ref={step2}
              />
            )}
            {completedSteps.includes(3) && (
              <Step3 onNextStep={() => handleCompleteStep(4)} ref={step3} />
            )}
            {completedSteps.includes(4) && <Step4 ref={step4} />}
          </>
        ) : (
          ''
        )}
        {docker ? (
          <>
            {completedSteps.includes(5) && (
              <Step1Docker
                onNextStep={() => handleCompleteStep2(6)}
                ref={step1Docker}
              />
            )}
            {completedSteps.includes(6) && <Steps2Docker ref={step2Docker} />}
          </>
        ) : (
          ''
        )}

        <button
          style={{ margin: 'auto', marginBottom: '30px', marginTop: '50px' }}
          className="boton-continue"
          onClick={() => onNextStep()}>
          Continue
        </button>
      </div>
    </div>
  );
});
DeployMethod.displayName = 'DeployMethod';
export default DeployMethod;
